"use client";

import { AppSidebar } from "@/components/Layout/AppSidebar";
import { useInvoiceStore } from "@/lib/store";
import { Plus, Search, Filter, Package, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import Link from "next/link";

export default function InventoryPage() {
    const { products, categories } = useInvoiceStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "all" || p.categoryId === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <AppSidebar />

            <main className="pl-64">
                <div className="max-w-6xl mx-auto p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
                            <p className="text-slate-500 text-sm">Manage products, stock levels, and pricing.</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            <span>Add Product</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products by name or SKU..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="w-48">
                            <select
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">Product Name</th>
                                    <th className="px-6 py-3">SKU</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3 text-right">Price</th>
                                    <th className="px-6 py-3 text-right">Stock</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900">{product.name}</p>
                                            <p className="text-xs text-slate-500 truncate max-w-xs">{product.description}</p>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600">
                                            {product.sku}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {categories.find(c => c.id === product.categoryId)?.name || 'Uncategorized'}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className={`font-medium ${product.stockQuantity < 20 ? 'text-amber-600' : 'text-slate-700'}`}>
                                                    {product.stockQuantity}
                                                </span>
                                                {product.stockQuantity < 10 && (
                                                    <AlertTriangle size={14} className="text-amber-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}
                                            `}>
                                                {product.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500">
                                            <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <Package size={24} className="text-slate-400" />
                                            </div>
                                            <p>No products found matching your filters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
