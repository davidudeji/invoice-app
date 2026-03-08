import { ReportRepository } from '@/repositories/ReportRepository';
import { ApiError } from '@/utils/api-response';

export class ReportService {
    static async revenueReport(userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const metrics = await ReportRepository.getRevenueMetrics(userId);
        const topClients = await ReportRepository.getClientRevenue(userId);

        // Business Logic: Aggregate client totals here if DB layer outputs raw
        const clientRevenue: Record<string, number> = {};
        topClients.forEach((inv: any) => {
            const clientName = inv.client?.name || 'Unknown Client';
            clientRevenue[clientName] = (clientRevenue[clientName] || 0) + inv.total;
        });

        const sortedClients = Object.entries(clientRevenue)
            .map(([name, revenue]) => ({ name, revenue }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        return {
            metrics,
            topClients: sortedClients
        };
    }

    static async outstandingInvoices(userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);
        const metrics = await ReportRepository.getRevenueMetrics(userId);
        return {
            pendingCount: metrics.pendingInvoices,
            overdueCount: metrics.overdueInvoices,
        }
    }

    static async monthlyFinancialSummary(userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const rawInvoices = await ReportRepository.getMonthlyRevenue(userId, 6);

        // Calculate grouping mathematically in Node rather than heavy DB aggregations
        const currentMonth = new Date().getMonth();
        const summary = Array(6).fill(0).map((_, i) => {
            return {
                monthOffset: i,
                revenue: 0
            }
        });

        rawInvoices.forEach(inv => {
            const invMonth = inv.date.getMonth();
            // Basic logic placeholder to aggregate monthly buckets natively
        });

        return {
            chartData: rawInvoices,
            last6MonthsSpan: true
        }
    }
}
