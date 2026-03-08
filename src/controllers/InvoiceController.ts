import { InvoiceService } from '@/services/InvoiceService';
import { successResponse, errorResponse } from '@/utils/api-response';

export class InvoiceController {

    static async createInvoice(userId: string, data: any) {
        try {
            const invoice = await InvoiceService.createInvoice(userId, data);
            return successResponse(invoice, 'Invoice created successfully', 201);
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async updateInvoice(id: string, userId: string, data: any) {
        try {
            // Assuming you expand UpdateLogic directly mapped inside Service
            const invoice = await InvoiceService.updateInvoiceStatus(id, userId, { status: data.status });
            return successResponse(invoice, 'Invoice updated successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async deleteInvoice(id: string, userId: string) {
        try {
            const result = await InvoiceService.deleteInvoice(id, userId);
            return successResponse(result, 'Invoice deleted successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async getInvoice(id: string, userId: string) {
        try {
            const invoice = await InvoiceService.getInvoiceById(id, userId);
            return successResponse(invoice, 'Invoice retrieved successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async listInvoices(userId: string) {
        try {
            const invoices = await InvoiceService.getInvoices(userId);
            return successResponse(invoices, 'Invoices listed successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async generateInvoicePDF(id: string, userId: string) {
        try {
            const pdfBufferAndName = await InvoiceService.generateInvoicePDF(id, userId);
            return successResponse(pdfBufferAndName, 'PDF Generated successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }
}
