import { z } from 'zod';

/**
 * Order item schema
 */
export const OrderItemSchema = z.object({
    id: z.string().min(1, 'Item ID is required'),
    name: z.string().min(1, 'Item name is required'),
    price: z.string().min(1, 'Price is required'),
    quantity: z.number().int().positive('Quantity must be positive').default(1),
    size: z.string().optional(),
    notes: z.string().max(500, 'Notes too long').optional()
});

/**
 * Create order request schema
 */
export const CreateOrderSchema = z.object({
    customerName: z
        .string()
        .min(2, 'Name must have at least 2 characters')
        .max(100, 'Name too long')
        .trim(),
    customerPhone: z
        .string()
        .min(10, 'Phone must have at least 10 digits')
        .max(20, 'Phone too long')
        .regex(/^[\d\s\-\(\)\+]+$/, 'Invalid phone format')
        .trim(),
    items: z
        .array(OrderItemSchema)
        .min(1, 'At least one item is required')
        .max(50, 'Too many items'),
    notes: z
        .string()
        .max(1000, 'Notes too long')
        .optional()
        .transform(val => val?.trim() || null),
    deliveryAddress: z
        .string()
        .max(500, 'Address too long')
        .optional()
        .transform(val => val?.trim() || null)
});

/**
 * Update order status schema
 */
export const UpdateOrderStatusSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], {
        errorMap: () => ({ message: 'Invalid status. Must be: pending, confirmed, preparing, ready, delivered, or cancelled' })
    })
});

/**
 * Query parameters for listing orders
 */
export const OrderQuerySchema = z.object({
    status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']).optional(),
    phone: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional()
});

/**
 * ID parameter schema
 */
export const IdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number)
});

// Type exports for use in routes
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
export type OrderQueryInput = z.infer<typeof OrderQuerySchema>;
