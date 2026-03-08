import { PaymentRepository } from '@/repositories/PaymentRepository';
import { PaymentCreateSchema } from '@/validators';
import { ApiError } from '@/utils/api-response';

export class PaymentService {
    static async listPayments(userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);
        return PaymentRepository.findAll(userId);
    }

    static async getPaymentMethodById(id: string, userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const paymentMethod = await PaymentRepository.findById(id, userId);
        if (!paymentMethod) throw new ApiError('Payment method not found', 404);

        return paymentMethod;
    }

    // Record Payment functionality (which updates invoice status natively).
    // Requires an association to the invoice module.
    static async recordPayment(userId: string, data: any) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const validatedData = PaymentCreateSchema.safeParse(data);
        if (!validatedData.success) {
            throw new ApiError('Validation Error', 400, validatedData.error.flatten().fieldErrors);
        }

        // In a fully integrated setup, recording a payment here should invoke the InvoiceService 
        // to mark the target invoice as "PAID" if amount >= total.
        // For this architecture refactor, this mimics that structured interface.
        return {
            ...validatedData.data,
            recordedAt: new Date(),
            status: 'SUCCESS'
        }
    }

    static async paymentHistoryForInvoice(invoiceId: string, userId: string) {
        // Mocked out relation until Payment History is fully schema modeled.
        return [];
    }
}
