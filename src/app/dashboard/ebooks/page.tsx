"use client";

import { AppSidebar } from "@/components/Layout/AppSidebar";
import { useInvoiceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, BookOpen, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EbooksPage() {
    const { ebooks, deleteEbook } = useInvoiceStore();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEbooks = ebooks.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this ebook?")) {
            deleteEbook(id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <AppSidebar />

            <main className="pl-64 w-full">
                <div className="max-w-6xl mx-auto p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Ebooks</h1>
                            <p className="text-slate-500 text-sm">Manage your digital products and library.</p>
                        </div>
                        <Link href="/dashboard/ebooks/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            <span>Upload Ebook</span>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Ebook Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEbooks.map(ebook => (
                            <div key={ebook.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
                                <div className="h-40 bg-slate-100 relative overflow-hidden">
                                    {/* Placeholder Cover if no image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                        <BookOpen size={48} />
                                    </div>
                                    {ebook.coverUrl && (
                                        <img src={ebook.coverUrl} alt={ebook.title} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize shadow-sm
                                            ${ebook.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                                        `}>
                                            {ebook.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{ebook.title}</h3>
                                    <p className="text-sm text-slate-500 mb-4">{ebook.author}</p>

                                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                                        <span className="font-bold text-slate-900">{formatCurrency(ebook.price)}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { }}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ebook.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredEbooks.length === 0 && (
                            <div className="col-span-full py-12 text-center text-slate-500">
                                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                    <BookOpen size={24} className="text-slate-400" />
                                </div>
                                <p>No ebooks found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
