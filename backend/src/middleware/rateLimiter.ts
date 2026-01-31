import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        error: 'Too many requests',
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Stricter rate limiter for order creation
 * 10 orders per hour per IP
 */
export const orderCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        success: false,
        error: 'Too many orders',
        message: 'Too many orders created from this IP, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Very strict limiter for sensitive operations
 * 5 requests per 15 minutes
 */
export const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many attempts, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});
