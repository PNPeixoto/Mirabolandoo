import { Router, Request, Response } from 'express';
import { supabase } from '../db/database'; // Import Supabase client
import { Order, ApiResponse } from '../types';
import {
    CreateOrderSchema,
    UpdateOrderStatusSchema,
    OrderQuerySchema,
    IdParamSchema,
    CreateOrderInput
} from '../middleware/validators';
import { asyncHandler, NotFoundError } from '../middleware/errorHandler';
import { orderCreationLimiter } from '../middleware/rateLimiter';

const router = Router();

// Helper to map snake_case DB result to camelCase Order object
const mapOrderFromDb = (row: any): Order => {
    return {
        id: row.id,
        customerName: row.customer_name,
        customerPhone: row.customer_phone,
        items: row.items,
        total: row.total,
        status: row.status,
        notes: row.notes,
        deliveryAddress: row.delivery_address,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    } as Order;
};

// ============================================
// GET /api/orders - List all orders with filters
// ============================================
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const query = OrderQuerySchema.parse(req.query);

    let dbQuery = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (query.status) {
        dbQuery = dbQuery.eq('status', query.status);
    }

    if (query.phone) {
        dbQuery = dbQuery.ilike('customer_phone', `%${query.phone}%`);
    }

    if (query.date) {
        const startDate = `${query.date}T00:00:00`;
        const endDate = `${query.date}T23:59:59`;
        dbQuery = dbQuery.gte('created_at', startDate).lte('created_at', endDate);
    }

    const { data, error } = await dbQuery;

    if (error) {
        throw new Error(`Database error: ${error.message}`);
    }

    const orders = (data || []).map(mapOrderFromDb);

    res.json({
        success: true,
        data: orders,
        message: `Found ${orders.length} orders`
    } as ApiResponse<Order[]>);
}));

// ============================================
// GET /api/orders/stats - Order statistics
// ============================================
router.get('/stats', asyncHandler(async (_req: Request, res: Response) => {
    const { data: allOrders, error } = await supabase.from('orders').select('status, total');

    if (error) throw new Error(error.message);

    const stats = {
        total: allOrders.length,
        pending: allOrders.filter(o => o.status === 'pending').length,
        confirmed: allOrders.filter(o => o.status === 'confirmed').length,
        preparing: allOrders.filter(o => o.status === 'preparing').length,
        ready: allOrders.filter(o => o.status === 'ready').length,
        delivered: allOrders.filter(o => o.status === 'delivered').length,
        cancelled: allOrders.filter(o => o.status === 'cancelled').length,
        totalRevenue: allOrders.reduce((sum, o) => o.status === 'delivered' ? sum + Number(o.total) : sum, 0),
        averageOrderValue: 0
    };

    if (stats.total > 0) {
        stats.averageOrderValue = allOrders.reduce((sum, o) => sum + Number(o.total), 0) / stats.total;
    }

    res.json({
        success: true,
        data: stats
    });
}));

// ============================================
// GET /api/orders/:id - Get single order
// ============================================
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params; // Using params directly to allow UUID

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        throw new NotFoundError('Order');
    }

    res.json({
        success: true,
        data: mapOrderFromDb(data)
    });
}));

// ============================================
// POST /api/orders - Create new order
// ============================================
router.post('/', orderCreationLimiter, asyncHandler(async (req: Request, res: Response) => {
    const validatedData: CreateOrderInput = CreateOrderSchema.parse(req.body);

    const total = validatedData.items.reduce((sum, item) => {
        const priceStr = item.price.replace('R$', '').replace(',', '.').trim();
        const price = parseFloat(priceStr) || 0;
        return sum + (price * item.quantity);
    }, 0);

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('orders')
        .insert({
            customer_name: validatedData.customerName,
            customer_phone: validatedData.customerPhone,
            items: validatedData.items,
            total: total,
            status: 'pending',
            notes: validatedData.notes,
            delivery_address: validatedData.deliveryAddress,
            created_at: now,
            updated_at: now
        })
        .select()
        .single();

    if (error) throw new Error(error.message);

    res.status(201).json({
        success: true,
        data: mapOrderFromDb(data),
        message: 'Pedido criado com sucesso!'
    });
}));

// ============================================
// PATCH /api/orders/:id - Update order status
// ============================================
router.patch('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = UpdateOrderStatusSchema.parse(req.body);

    const { data, error } = await supabase
        .from('orders')
        .update({
            status: status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') throw new NotFoundError('Order');
        throw new Error(error.message);
    }

    res.json({
        success: true,
        data: mapOrderFromDb(data),
        message: `Status atualizado para: ${status}`
    });
}));

// ============================================
// DELETE /api/orders/:id - Delete order
// ============================================
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);

    res.json({
        success: true,
        message: 'Pedido removido com sucesso',
        data: { id }
    });
}));

export default router;
