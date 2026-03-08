export class ApiError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(message: string, statusCode: number = 500, details?: any) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }
}

export function successResponse(data: any, message = 'Success', statusCode = 200) {
    return {
        success: true,
        message,
        data,
        statusCode
    };
}

export function errorResponse(error: unknown) {
    if (error instanceof ApiError) {
        return {
            success: false,
            message: error.message,
            errors: error.details,
            statusCode: error.statusCode
        };
    }

    // Handle Prisma generic errors indirectly if needed

    return {
        success: false,
        message: 'An unexpected error occurred.',
        statusCode: 500
    };
}
