"use client";

import { AppSidebar } from "@/components/Layout/AppSidebar";
import { useInvoiceStore } from "@/lib/store";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { useMemo } from "react";

export default function ReportsPage() {
    const { invoices, clients, getStats } = useInvoiceStore();
    const stats = getStats();

    // Calculate monthly data (mocked/implied for this demo since we don't have historical data spread out much)
    // We'll just show current snapshot data as "This Month"

    // Vendor Spending (Top 5)
    const vendorSpending = useMemo(() => {
        const spending: Record<string, number> = {};
        invoices.forEach(inv => {
            const clientName = clients.find(c => c.id === inv.clientId)?.name || 'Unknown';
            spending[clientName] = (spending[clientName] || 0) + inv.total;
        });

        return Object.entries(spending)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, amount]) => ({ name, amount }));
    }, [invoices, clients]);

    const maxSpending = Math.max(...vendorSpending.map(v => v.amount), 0);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AppSidebar />

            <main className="pl-64">
                <div className="max-w-6xl mx-auto p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
                        <p className="text-slate-500 text-sm">Real-time insights into your business finances.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <TrendingUp size={20} />
                                </div>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900">${stats.totalRevenue.toLocaleString()}</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">

                                    <Calendar size={20} />
                                </div>
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{stats.pendingCount} Invoices</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Outstanding Amount</p>
                            <h3 className="text-2xl font-bold text-slate-900">${stats.pendingAmount.toLocaleString()}</h3>
                        </div>

                        {/* Net Profit (Simulated) */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <DollarSign size={20} />
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Net Profit (Est.)</p>
                            <h3 className="text-2xl font-bold text-slate-900">${(stats.totalRevenue * 0.85).toLocaleString()}</h3>
                            <p className="text-xs text-slate-400 mt-1">Based on 15% avg. margin</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Cash Flow Chart Visualization */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Cash Flow Projection</h3>

                            <div className="h-64 flex items-end justify-between gap-2">
                                {/* Simulated bar chart for 6 months */}
                                {[45, 60, 35, 78, 52, 65].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                                        <div className="w-full bg-indigo-50 rounded-t-lg relative overflow-hidden transition-all duration-300 group-hover:bg-indigo-100">
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-500"
                                                style={{ height: `${h}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-center text-slate-500 font-medium">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Vendors */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Top Vendors by Spend</h3>

                            <div className="space-y-6">
                                {vendorSpending.length === 0 ? (
                                    <p className="text-slate-500 italic text-center py-8">No vendor data available.</p>
                                ) : (
                                    vendorSpending.map((vendor, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-slate-700">{vendor.name}</span>
                                                <span className="font-bold text-slate-900">${vendor.amount.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${(vendor.amount / maxSpending) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
