"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { SmartCapture } from "@/components/Invoices/SmartCapture";
import { InvoiceForm } from "@/components/Invoices/InvoiceForm";
import { useInvoiceStore } from "@/lib/store";
import { Invoice } from "@/types";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function NewInvoicePage() {
    const router = useRouter();
    const { clients, addInvoice } = useInvoiceStore();

    const [invoiceData, setInvoiceData] = useState<Partial<Invoice>>({
        items: [],
        dueDate: "",
        matchStatus: 'unmatched',
        approvalStatus: 'pending',
        subtotal: 0,
        taxRate: 10,
        taxAmount: 0,
        total: 0
    });

    const handleCapture = (capturedData: Partial<Invoice>) => {
        setInvoiceData(prev => ({
            ...prev,
            ...capturedData
        }));
    };

    const handleSave = () => {
        if (!invoiceData.clientId) return alert("Please select a client");

        const newInvoice: Invoice = {
            id: crypto.randomUUID(),
            number: `INV-${Date.now().toString().slice(-6)}`,
            createdAt: new Date().toISOString(),
            dueDate: invoiceData.dueDate || new Date().toISOString(),
            status: 'pending',
            approvalStatus: invoiceData.approvalStatus || 'pending',
            matchStatus: invoiceData.matchStatus || 'unmatched',
            clientId: invoiceData.clientId,
            items: invoiceData.items || [],
            subtotal: invoiceData.subtotal || 0,
            taxRate: invoiceData.taxRate || 10,
            taxAmount: invoiceData.taxAmount || 0,
            total: invoiceData.total || 0,
            relatedDocuments: invoiceData.relatedDocuments
        };

        addInvoice(newInvoice);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AppSidebar />

            <main className="pl-64">
                <div className="max-w-6xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <ChevronLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">New Invoice</h1>
                                <p className="text-slate-500 text-sm">Create and schedule a new invoice.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <SmartCapture onCapture={handleCapture} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Editor Form */}
                        <InvoiceForm
                            data={invoiceData}
                            onChange={(updated) => setInvoiceData(prev => ({ ...prev, ...updated }))}
                            onSave={handleSave}
                        />

                        {/* Live Preview */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sticky top-8 h-fit">
                            <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-8">
                                <div>
                                    <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                                        IP
                                    </div>
                                    <h1 className="text-lg font-bold text-slate-900">INVOICE</h1>
                                    <p className="text-slate-500 text-sm"># DRAFT</p>
                                </div>
                                <div className="text-right text-sm text-slate-500">
                                    <p className="font-semibold text-slate-900">InvoicePay Inc.</p>
                                    <p>123 Business Rd</p>
                                    <p>New York, NY 10001</p>
                                </div>
                            </div>

                            <div className="mb-8 flex justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bill To</p>
                                    {invoiceData.clientId ? (
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900 text-base">{clients.find(c => c.id === invoiceData.clientId)?.name}</p>
                                            <p className="text-slate-500">{clients.find(c => c.id === invoiceData.clientId)?.address}</p>
                                            <p className="text-slate-500">{clients.find(c => c.id === invoiceData.clientId)?.email}</p>
                                        </div>
                                    ) : (
                                        <p className="text-slate-300 italic text-sm">Select a client...</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Due</p>
                                    <p className="text-2xl font-bold text-indigo-600">${(invoiceData.total || 0).toFixed(2)}</p>
                                </div>
                            </div>

                            <table className="w-full mb-6">
                                <thead>
                                    <tr className="border-b border-slate-200 text-left">
                                        <th className="py-2 text-xs font-semibold text-slate-500 uppercase">Item</th>
                                        <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Qty</th>
                                        <th className="py-2 text-right text-xs font-semibold text-slate-500 uppercase">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {invoiceData.items?.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-50">
                                            <td className="py-3 text-slate-700">{item.description || 'Item Name'}</td>
                                            <td className="py-3 text-right text-slate-700">{item.quantity}</td>
                                            <td className="py-3 text-right text-slate-700">${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {(!invoiceData.items || invoiceData.items.length === 0) && (
                                        <tr>
                                            <td colSpan={3} className="py-8 text-center text-slate-400 italic bg-slate-50/50 rounded-lg mt-2">
                                                No items added
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="flex justify-end border-t border-slate-100 pt-4">
                                <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-medium text-slate-900">${(invoiceData.subtotal || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Tax (10%)</span>
                                        <span className="font-medium text-slate-900">${(invoiceData.taxAmount || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 text-slate-900">
                                        <span>Total</span>
                                        <span>${(invoiceData.total || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
