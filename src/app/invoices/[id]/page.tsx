"use client";

import { useInvoiceStore } from '@/lib/store';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Mail, CheckCircle, Printer } from 'lucide-react';
import Link from 'next/link';
import { InvoiceStatus } from '@/types';

function StatusBadge({ status }: { status: InvoiceStatus }) {
    const styles = {
        draft: 'bg-slate-100 text-slate-700',
        pending: 'bg-amber-50 text-amber-700',
        paid: 'bg-emerald-50 text-emerald-700',
        overdue: 'bg-rose-50 text-rose-700',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function InvoiceDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { invoices, clients, updateInvoice } = useInvoiceStore();

    const invoice = invoices.find(inv => inv.id === id);
    const client = invoice ? clients.find(c => c.id === invoice.clientId) : undefined;

    if (!invoice) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">Invoice not found</h2>
                    <Link href="/invoices" className="text-indigo-600 hover:text-indigo-500 mt-4 block">
                        Return to Invoices
                    </Link>
                </div>
            </div>
        );
    }

    const markAsPaid = () => {
        updateInvoice(invoice.id, { status: 'paid' });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AppSidebar />

            <main className="pl-64">
                <div className="max-w-5xl mx-auto p-8">

                    <div className="mb-8">
                        <Link href="/invoices" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-4 transition-colors">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Invoices
                        </Link>

                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-slate-900">{invoice.number}</h1>
                                    <StatusBadge status={invoice.status} />
                                </div>
                                <p className="text-slate-500">Created on {new Date(invoice.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white bg-white">
                                    <Download size={16} />
                                    PDF
                                </button>
                                {invoice.status !== 'paid' && (
                                    <button
                                        onClick={markAsPaid}
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                                    >
                                        <CheckCircle size={16} />
                                        Mark as Paid
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-200 flex justify-between">
                            <div>
                                <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">
                                    IP
                                </div>
                                <h3 className="font-semibold text-slate-900">InvoicePay Inc.</h3>
                                <p className="text-slate-500 text-sm mt-1">123 Business Rd<br />New York, NY 10001</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-slate-500 text-sm uppercase tracking-wide font-semibold mb-4">Bill To</h3>
                                <h3 className="font-semibold text-slate-900">{client?.name || 'Unknown Client'}</h3>
                                <p className="text-slate-500 text-sm mt-1">{client?.address}</p>
                                <p className="text-slate-500 text-sm">{client?.email}</p>
                            </div>
                        </div>

                        <div className="p-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 text-left">
                                        <th className="py-2 text-xs font-semibold text-slate-500 uppercase">Item Description</th>
                                        <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Quantity</th>
                                        <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Rate</th>
                                        <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {invoice.items.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-50">
                                            <td className="py-4 text-slate-900 font-medium">{item.description}</td>
                                            <td className="py-4 text-right text-slate-500">{item.quantity}</td>
                                            <td className="py-4 text-right text-slate-500">${item.price.toFixed(2)}</td>
                                            <td className="py-4 text-right text-slate-900 font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-end mt-8">
                                <div className="w-1/3 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-medium text-slate-900">${invoice.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Tax ({invoice.taxRate}%)</span>
                                        <span className="font-medium text-slate-900">${invoice.taxAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold border-t border-slate-200 pt-3 text-slate-900">
                                        <span>Total</span>
                                        <span>${invoice.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-sm text-slate-500 flex justify-between items-center">
                            <span>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                            <span>Thank you for your business!</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
