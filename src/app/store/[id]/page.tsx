"use client";

import { useInvoiceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Check, Lock, ShieldCheck, Download, Star } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, use } from "react";

export default function EbookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { ebooks } = useInvoiceStore();
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false); // Mock local state for demo

    const ebook = ebooks.find(e => e.id === id);

    if (!ebook) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">Book not found.</p>
                    <Link href="/store" className="text-indigo-600 hover:underline">Back to Store</Link>
                </div>
            </div>
        );
    }

    const handlePurchase = async () => {
        setIsPurchasing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setHasPurchased(true);
        setIsPurchasing(false);
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <Link href="/store" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left: Product Viz */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-slate-50 rounded-3xl p-12 flex items-center justify-center border border-slate-100 shadow-inner">
                            <div className="relative aspect-[3/4] w-full max-w-sm shadow-2xl rounded-r-lg transform rotate-y-12">
                                {ebook.coverUrl ? (
                                    <img src={ebook.coverUrl} alt={ebook.title} className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center text-white/20">
                                        <span className="text-2xl font-bold">No Cover</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">Ebook</span>
                            <div className="flex items-center text-amber-500 text-sm gap-1">
                                <Star size={14} fill="currentColor" />
                                <span className="font-medium text-slate-700">4.9 (120 reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{ebook.title}</h1>
                        <p className="text-lg text-slate-500 mb-8 font-medium">By {ebook.author}</p>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-4xl font-bold text-indigo-600">{formatCurrency(ebook.price)}</span>
                            <span className="text-slate-400 text-lg line-through mb-1">{formatCurrency(ebook.price * 1.5)}</span>
                        </div>

                        <div className="prose prose-slate text-slate-600 mb-8">
                            <p>{ebook.description}</p>
                        </div>

                        {/* Payment / Download Area */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-8">
                            {hasPurchased ? (
                                <div className="text-center space-y-4">
                                    <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-lg">
                                        <Check size={24} />
                                        <span>Purchase Complete!</span>
                                    </div>
                                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-boldshadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all">
                                        <Download size={20} />
                                        Download PDF
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handlePurchase}
                                    disabled={isPurchasing}
                                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {isPurchasing ? 'Processing...' : `Buy for ${formatCurrency(ebook.price)}`}
                                </button>
                            )}

                            {!hasPurchased && (
                                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure Payment</span>
                                    <span className="flex items-center gap-1"><Lock size={14} /> Instant Access</span>
                                </div>
                            )}
                        </div>

                        {/* Preview */}
                        <div className="border-t border-slate-100 pt-8">
                            <h3 className="font-bold text-slate-900 mb-4">What's Inside</h3>
                            <ul className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center font-bold text-xs">{i}</div>
                                        <span className="flex-1">Chapter {i}: Introduction to topic</span>
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Preview</span>
                                    </li>
                                ))}
                                <li className="flex items-center gap-3 text-slate-400 p-3 opacity-60">
                                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-xs"><Lock size={12} /></div>
                                    <span className="flex-1">Chapter 4: Advanced Techniques</span>
                                    <span className="text-xs">Locked</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
