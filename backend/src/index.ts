import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeDatabase, closeDatabase } from './db/database';
import ordersRouter from './routes/orders';
import menuRouter from './routes/menu';
import consumerRouter from './routes/consumer';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            scriptSrc: ["'self'"],
        }
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 86400 // 24 hours preflight cache
}));

// Rate limiting
app.use('/api', apiLimiter);

// Body parser
app.use(express.json({ limit: '10kb' })); // Limit body size for security
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ============================================
// DATABASE INITIALIZATION
// ============================================

try {
    initializeDatabase();
    console.log('✅ Database ready');
} catch (error) {
    console.error('❌ Failed to initialize database:', error);
    process.exit(1);
}

// ============================================
// ROUTES
// ============================================

app.use('/api/orders', ordersRouter);
app.use('/api/menu', menuRouter);
app.use('/api/consumer', consumerRouter);

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Mirabolando Backend is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API info
app.get('/api', (_req: Request, res: Response) => {
    res.json({
        name: 'Mirabolando API',
        version: '1.1.0',
        security: {
            helmet: 'enabled',
            rateLimiting: 'enabled',
            inputValidation: 'Zod'
        },
        endpoints: {
            menu: {
                'GET /api/menu': 'List menu items',
                'GET /api/menu/categories': 'List categories',
                'GET /api/menu/:id': 'Get menu item'
            },
            orders: {
                'GET /api/orders': 'List orders (filters: ?status, ?phone, ?date)',
                'GET /api/orders/stats': 'Order statistics',
                'GET /api/orders/:id': 'Get order details',
                'POST /api/orders': 'Create order',
                'PATCH /api/orders/:id': 'Update order status',
                'DELETE /api/orders/:id': 'Delete order'
            }
        }
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Endpoint not found. Visit /api for available endpoints.'
    });
});

// ============================================
// ERROR HANDLER (must be last)
// ============================================
app.use(errorHandler);

// ============================================
// SERVER
// ============================================

let server: any;

// Only listen if not running in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    server = app.listen(PORT, () => {
        console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║         🍰 MIRABOLANDO BACKEND SERVER 🍰              ║
    ╠═══════════════════════════════════════════════════════╣
    ║  Server running on: http://localhost:${PORT}             ║
    ║  API docs: http://localhost:${PORT}/api                  ║
    ║  Health check: http://localhost:${PORT}/health           ║
    ╠═══════════════════════════════════════════════════════╣
    ║  🔒 Security: Helmet + Rate Limiting + Zod Validation ║
    ╚═══════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down gracefully...');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
}

process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received, shutting down...');
    closeDatabase();
    if (server) {
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    closeDatabase();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
