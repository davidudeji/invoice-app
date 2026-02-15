"use client";

import { AppSidebar } from "@/components/Layout/AppSidebar";
import { useInvoiceStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, UploadCloud, Save, FileText, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Ebook } from "@/types";

export default function NewEbookPage() {
    const router = useRouter();
    const { addEbook } = useInvoiceStore();
    const [loading, setLoading] = useState(false);

    // Mock File State
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [ebookFile, setEbookFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        price: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newEbook: Ebook = {
            id: crypto.randomUUID(),
            title: formData.title,
            author: formData.author,
            description: formData.description,
            price: parseFloat(formData.price),
            // Mock URLs for demo
            coverUrl: coverFile ? URL.createObjectURL(coverFile) : "",
            fileUrl: ebookFile ? URL.createObjectURL(ebookFile) : "",
            status: 'published',
            createdAt: new Date().toISOString()
        };

        addEbook(newEbook);
        router.push('/dashboard/ebooks');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <AppSidebar />

            <main className="pl-64 w-full">
                <div className="max-w-3xl mx-auto p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard/ebooks" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Upload Ebook</h1>
                            <p className="text-slate-500 text-sm">Add a new book to your store.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-8">

                        {/* 1. File Uploads */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Cover Image */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Cover Image</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer relative h-48">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                                    />
                                    {coverFile ? (
                                        <div className="relative w-full h-full">
                                            <img src={URL.createObjectURL(coverFile)} alt="Preview" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs opacity-0 hover:opacity-100 transition-opacity">Change</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-3">
                                                <ImageIcon size={20} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-900">Upload Cover</p>
                                            <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Book File */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Book File (PDF/EPUB)</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer relative h-48">
                                    <input
                                        type="file"
                                        accept=".pdf,.epub"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setEbookFile(e.target.files?.[0] || null)}
                                    />
                                    {ebookFile ? (
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                                                <FileText size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{ebookFile.name}</p>
                                            <p className="text-xs text-slate-500">{(ebookFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-3">
                                                <UploadCloud size={20} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-900">Upload Ebook</p>
                                            <p className="text-xs text-slate-500 mt-1">PDF or EPUB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 2. Metadata */}
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Book Title</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. Advanced System Design"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Author</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. John Doe"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Price (₦ Naira)</label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    step="100"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono"
                                    placeholder="0"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                                <p className="text-xs text-slate-500">Enter simple integer amount (e.g. 5000 for ₦5,000).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none h-32 resize-none"
                                    placeholder="What is this book about?"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                            <Link href="/dashboard/ebooks" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading || !coverFile || !ebookFile}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={16} />
                                {loading ? 'Uploading...' : 'Publish Ebook'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
