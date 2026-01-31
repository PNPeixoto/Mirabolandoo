import { Router, Request, Response } from 'express';
import { supabase } from '../db/database';
import {
    ConsumerPollingResponse,
    ConsumerPollingEvent,
    ConsumerOrderResponse,
    ConsumerOrderDetails
} from '../types';
import { asyncHandler, NotFoundError } from '../middleware/errorHandler';

const router = Router();

// ============================================
// GET /api/consumer/polling - Polling for new events
// ============================================
router.get('/polling', asyncHandler(async (_req: Request, res: Response) => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Using explicit typing for the query builder to avoid 'prepare' errors if interface mocks leak
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .gte('created_at', oneDayAgo)
        .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);

    const items: ConsumerPollingEvent[] = (orders || []).map((row: any) => ({
        id: `evt-${row.id}`,
        orderId: row.id.toString(),
        createdAt: row.created_at,
        fullCode: 'PLACED',
        code: 'PLC'
    }));

    const response: ConsumerPollingResponse = {
        items,
        statusCode: 0,
        reasonPhrase: null
    };

    res.json(response);
}));

// ============================================
// GET /api/consumer/orders/:id - Get order details
// ============================================
router.get('/orders/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !order) {
        throw new NotFoundError('Order');
    }

    const orderTotal = Number(order.total) || 0;

    const consumerOrder: ConsumerOrderDetails = {
        id: order.id.toString(),
        displayId: order.id.toString().substring(0, 8),
        createdAt: order.created_at,
        orderType: 'DELIVERY',
        orderTiming: 'IMMEDIATE',
        total: {
            orderAmount: orderTotal,
            deliveryFee: 0,
            additionalFees: 0,
            subTotal: orderTotal,
            benefits: 0
        },
        payments: {
            methods: [
                {
                    method: 'CREDIT',
                    value: orderTotal,
                    type: 'OFFLINE',
                    prepaid: false
                }
            ],
            pending: orderTotal,
            prepaid: 0
        },
        items: (order.items || []).map((item: any, index: number) => {
            const unitPrice = parseFloat(item.price.replace('R$', '').replace(',', '.').trim()) || 0;
            return {
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unitPrice: unitPrice,
                totalPrice: unitPrice * item.quantity,
                index: index + 1,
                unit: 'UN',
                externalCode: item.id
            };
        }),
        customer: {
            id: order.customer_phone,
            name: order.customer_name,
            phone: {
                number: order.customer_phone
            }
        },
        delivery: {
            mode: 'DEFAULT',
            deliveredBy: 'Partner',
            deliveryAddress: {
                formattedAddress: order.delivery_address || 'Endereço não informado',
                streetName: '',
                streetNumber: '',
                neighborhood: '',
                city: '',
                state: '',
                postalCode: ''
            }
        }
    };

    const response: ConsumerOrderResponse = {
        item: consumerOrder,
        statusCode: 0,
        reasonPhrase: null
    };

    res.json(response);
}));

// ============================================
// POST /api/consumer/orders/:id/status - Update order status
// ============================================
router.post('/orders/:id/status', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    let internalStatus = '';

    switch (status) {
        case 'CONFIRMED': internalStatus = 'confirmed'; break;
        case 'CANCELLED': internalStatus = 'cancelled'; break;
        case 'DISPATCHED': internalStatus = 'delivered'; break;
        case 'CONCLUDED': internalStatus = 'delivered'; break;
        case 'READY_TO_PICKUP': internalStatus = 'ready'; break;
        default:
            console.warn(`Status desconhecido recebido do Consumer: ${status}`);
            res.status(400).json({ error: 'Unknown status' });
            return;
    }

    if (internalStatus) {
        const { error } = await supabase
            .from('orders')
            .update({
                status: internalStatus,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        if (error) throw new Error(error.message);
    }

    res.json({ success: true, message: 'Status updated' });
}));

export default router;
