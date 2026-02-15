"use client";

import { useInvoiceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Search, ShoppingCart, User, Lock, BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StorePage() {
    const { ebooks } = useInvoiceStore();
    const [searchQuery, setSearchQuery] = useState("");

    const publishedEbooks = ebooks.filter(e =>
        e.status === 'published' &&
        (e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Minimal Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                            IP
                        </div>
                        <span className="font-bold text-lg tracking-tight">InvoicePay Learning</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full pl-10 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-500 rounded-full text-sm transition-all outline-none"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <nav className="flex gap-4 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-indigo-600">Home</Link>
                            <Link href="/store" className="text-indigo-600">Store</Link>
                            <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
                        </nav>
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative">
                            <ShoppingCart size={20} />
                            {/* Badge could go here */}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Master Your Craft</h1>
                    <p className="text-lg text-slate-600">Premium resources and guides to help you scale your business and manage finances better.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {publishedEbooks.map(ebook => (
                        <Link href={`/store/${ebook.id}`} key={ebook.id} className="group flex flex-col">
                            <div className="aspect-[3/4] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                {ebook.coverUrl ? (
                                    <img src={ebook.coverUrl} alt={ebook.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-300 p-6 text-center">
                                        <BookOpen size={48} className="mb-2" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">No Cover</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        View Details <div className="w-4 h-0.5 bg-white rounded-full"></div>
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{ebook.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{ebook.author}</p>
                                <div className="flex items-center gap-2 pt-1">
                                    <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">
                                        {formatCurrency(ebook.price)}
                                    </span>
                                    {/* Mock Rating */}
                                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-slate-400 font-medium ml-1">4.8</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {publishedEbooks.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-400">
                            <p>No published books available yet.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 mt-12 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} InvoicePay. All rights reserved.</p>
            </footer>
        </div>
    );
}
