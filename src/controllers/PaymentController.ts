import { PaymentService } from '@/services/PaymentService';
import { successResponse, errorResponse } from '@/utils/api-response';

export class PaymentController {

    static async recordPayment(userId: string, data: any) {
        try {
            const payment = await PaymentService.recordPayment(userId, data);
            return successResponse(payment, 'Payment recorded successfully', 201);
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async listPayments(userId: string) {
        try {
            const payments = await PaymentService.listPayments(userId);
            return successResponse(payments, 'Payments retrieved successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async paymentHistoryForInvoice(invoiceId: string, userId: string) {
        try {
            const history = await PaymentService.paymentHistoryForInvoice(invoiceId, userId);
            return successResponse(history, 'Payment history retrieved');
        } catch (error) {
            return errorResponse(error);
        }
    }
}
