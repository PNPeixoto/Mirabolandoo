import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Not Found Error
 */
export class NotFoundError extends ApiError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, 404);
    }
}

/**
 * Validation Error
 */
export class ValidationError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

/**
 * Centralized error handler middleware
 */
export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    // Log error for debugging (don't log in production for sensitive data)
    console.error('❌ Error:', err.message);

    // Zod validation errors
    if (err instanceof ZodError) {
        const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        res.status(400).json({
            success: false,
            error: 'Validation error',
            message: messages.join(', '),
            details: err.errors
        });
        return;
    }

    // Custom API errors
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            message: err.message
        });
        return;
    }

    // Database errors
    if (err.message.includes('SQLITE') || err.message.includes('database')) {
        res.status(500).json({
            success: false,
            error: 'Database error',
            message: 'An error occurred while accessing the database'
        });
        return;
    }

    // Generic server error (don't expose internal details)
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred'
    });
};

/**
 * Async handler wrapper to catch async errors
 */
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
