// Order status types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

// Order item (from menu)
export interface OrderItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    size?: string;
    notes?: string;
}

// Order
export interface Order {
    id: number | string;
    customerName: string;
    customerPhone: string;
    customerId?: string; // Optional linking to customers table
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    notes?: string;
    deliveryAddress?: string;
    createdAt: string;
    updatedAt: string;
}

// Menu item
export interface MenuItem {
    id: string;
    name: string;
    category: string;
    shortDesc: string;
    fullDesc: string;
    price: string;
    image: string;
    options?: { size: string; price: string }[];
    available: boolean;
}

// API response
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Request types
export interface CreateOrderRequest {
    customerName: string;
    customerPhone: string;
    items: OrderItem[];
    notes?: string;
    deliveryAddress?: string;
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
}

// Stats
export interface OrderStats {
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
}
