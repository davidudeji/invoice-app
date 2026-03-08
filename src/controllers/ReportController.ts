import { ReportService } from '@/services/ReportService';
import { successResponse, errorResponse } from '@/utils/api-response';

export class ReportController {

    static async revenueReport(userId: string) {
        try {
            const report = await ReportService.revenueReport(userId);
            return successResponse(report, 'Revenue report retrieved');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async outstandingInvoices(userId: string) {
        try {
            const outstanding = await ReportService.outstandingInvoices(userId);
            return successResponse(outstanding, 'Outstanding invoices calculated');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async monthlyFinancialSummary(userId: string) {
        try {
            const summary = await ReportService.monthlyFinancialSummary(userId);
            return successResponse(summary, 'Monthly financial summary retrieved');
        } catch (error) {
            return errorResponse(error);
        }
    }
}
