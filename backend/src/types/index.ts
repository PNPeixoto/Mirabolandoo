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

// Consumer API Types
export interface ConsumerPollingEvent {
    id: string; // Event ID (unique)
    orderId: string;
    createdAt: string;
    fullCode: string;
    code: string;
}

export interface ConsumerPollingResponse {
    items: ConsumerPollingEvent[];
    statusCode: number;
    reasonPhrase: string | null;
}

export interface ConsumerOrderItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    type?: string;
    externalCode?: string;
}

export interface ConsumerOrderPayment {
    methods: {
        method: string;
        value: number;
        type: string;
        prepaid: boolean;
    }[];
    pending: number;
    prepaid: number;
}

export interface ConsumerCustomer {
    id: string;
    name: string;
    phone: {
        number: string;
    };
}

export interface ConsumerDeliveryAddress {
    streetName: string;
    streetNumber: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
    reference?: string;
    formattedAddress?: string;
}

export interface ConsumerOrderDetails {
    id: string; // Order ID
    displayId: string;
    createdAt: string;
    orderType: 'DELIVERY' | 'TAKEOUT' | 'INDOOR';
    orderTiming: 'IMMEDIATE' | 'SCHEDULED';
    status?: string; // Internal status mapping
    total: {
        orderAmount: number;
        deliveryFee: number;
        additionalFees: number;
        subTotal: number;
        benefits: number;
    };
    payments: ConsumerOrderPayment;
    items: ConsumerOrderItem[];
    customer: ConsumerCustomer;
    delivery: {
        mode: 'DEFAULT';
        deliveredBy: 'Partner';
        deliveryAddress: ConsumerDeliveryAddress;
    };
}

export interface ConsumerOrderResponse {
    item: ConsumerOrderDetails;
    statusCode: number;
    reasonPhrase: string | null;
}
