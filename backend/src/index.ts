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

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 86400
}));

app.use('/api', apiLimiter);
app.use(express.json({ limit: '10kb' }));
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

app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Mirabolando Backend is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/api', (_req: Request, res: Response) => {
    res.json({
        name: 'Mirabolando API',
        version: '1.1.0',
        endpoints: {
            menu: '/api/menu',
            orders: '/api/orders',
            consumer: '/api/consumer'
        }
    });
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Not found'
    });
});

app.use(errorHandler);

// ============================================
// SERVER
// ============================================

let server: any;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    server = app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
    });

    process.on('SIGINT', () => {
        server.close(() => {
            process.exit(0);
        });
    });
}

process.on('SIGTERM', () => {
    closeDatabase();
    if (server) {
        server.close(() => process.exit(0));
    } else {
        process.exit(0);
    }
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    closeDatabase();
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
});

export default app;
