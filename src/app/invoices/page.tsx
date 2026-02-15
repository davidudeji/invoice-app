"use client";

import { AppSidebar } from '@/components/Layout/AppSidebar';
import { useInvoiceStore } from '@/lib/store';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { InvoiceStatus } from '@/types';

function StatusBadge({ status }: { status: InvoiceStatus }) {
    const styles = {
        draft: 'bg-slate-100 text-slate-700 ring-slate-600/20',
        pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        overdue: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    };

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || styles.draft}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function InvoicesPage() {
    const { invoices, clients } = useInvoiceStore();

    const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Unknown Client';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AppSidebar />

            <main className="pl-64">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                            <p className="text-sm text-slate-500">Manage your billing and payments.</p>
                        </div>
                        <Link
                            href="/invoices/new"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                        >
                            <Plus size={16} />
                            New Invoice
                        </Link>
                    </div>

                    {/* Filters & Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 p-4 flex gap-4 items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search invoices..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>

                    {/* Invoice Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Number</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                <Link href={`/invoices/${invoice.id}`}>{invoice.number}</Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {getClientName(invoice.clientId)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {new Date(invoice.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                                ${invoice.total.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={invoice.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/invoices/${invoice.id}`} className="text-slate-400 hover:text-indigo-600">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {invoices.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                                                No invoices found. Create your first one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
