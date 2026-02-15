"use client";

import { AppSidebar } from "@/components/Layout/AppSidebar";
import { useInvoiceStore } from "@/lib/store";
import { useState } from "react";
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, User } from "lucide-react";

export default function SalesPage() {
    const { products, categories, cart, clients, addToCart, removeFromCart, updateCartQuantity, clearCart, addInvoice } = useInvoiceStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedClient, setSelectedClient] = useState("");
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Filter Products
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory;
        return matchesSearch && matchesCategory && p.status === 'active';
    });

    // Cart Calculations
    const cartTotal = cart.reduce((sum, item) => sum + (item.priceAtAdd * item.quantity), 0);
    const taxRate = 0.10; // 10% mock tax
    const taxAmount = cartTotal * taxRate;
    const finalTotal = cartTotal + taxAmount;

    const handleAddToCart = (product: any) => {
        addToCart({
            productId: product.id,
            quantity: 1,
            priceAtAdd: product.price
        });
    };

    const handleCheckout = () => {
        if (!selectedClient) {
            alert("Please select a client first");
            return;
        }

        // Generate Invoice from Sale
        const newInvoice = {
            id: crypto.randomUUID(),
            number: `INV-${Math.floor(Math.random() * 10000)}`,
            clientId: selectedClient,
            date: new Date().toISOString(),
            dueDate: new Date().toISOString(), // Paid immediately
            status: 'paid' as const,
            items: cart.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    id: crypto.randomUUID(),
                    description: product?.name || 'Unknown Item',
                    quantity: item.quantity,
                    price: item.priceAtAdd
                };
            }),
            total: finalTotal,
            subtotal: cartTotal,
            tax: taxAmount,
            taxRate: 0.10,
            taxAmount: taxAmount,
            discount: 0,
            notes: 'POS Sale',
            createdAt: new Date().toISOString(),
            approvalStatus: 'approved' as const,
            matchStatus: 'matched' as const
        };

        addInvoice(newInvoice);
        clearCart();
        alert("Sale completed! Invoice generated.");
        setIsCheckingOut(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <AppSidebar />

            <div className="pl-64 flex w-full h-screen overflow-hidden">
                {/* Left: Product Catalog */}
                <div className="flex-1 flex flex-col border-r border-slate-200">
                    {/* Header & Filter */}
                    <div className="p-6 bg-white border-b border-slate-200">
                        <h1 className="text-xl font-bold text-slate-900 mb-4">New Sale</h1>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left flex flex-col h-full group"
                                >
                                    <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300">
                                        <Package className="w-12 h-12" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                                    <p className="text-xs text-slate-500 mb-3 line-clamp-2 flex-1">{product.description}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
                                        <span className="text-xs font-medium text-slate-400">{product.stockQuantity} in stock</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Cart Panel */}
                <div className="w-96 bg-white flex flex-col shadow-xl z-10">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                            <ShoppingCart size={20} />
                            <span>Current Sale</span>
                        </div>
                        <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-600 font-medium hover:underline">
                            Clear Cart
                        </button>
                    </div>

                    {/* Client Selection */}
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-3 py-2">
                            <User size={16} className="text-slate-400" />
                            <select
                                className="flex-1 bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
                                value={selectedClient}
                                onChange={e => setSelectedClient(e.target.value)}
                            >
                                <option value="">Select Customer...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 opacity-50">
                                <ShoppingCart size={48} />
                                <p className="text-sm">Cart is empty</p>
                            </div>
                        ) : (
                            cart.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                if (!product) return null;
                                return (
                                    <div key={item.productId} className="flex gap-3">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{product.name}</h4>
                                                <p className="text-sm font-bold text-slate-900">${(item.priceAtAdd * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500">${item.priceAtAdd}/unit</p>
                                                <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1 border border-slate-200">
                                                    <button onClick={() => updateCartQuantity(item.productId, Math.max(0, item.quantity - 1))} className="p-0.5 hover:text-indigo-600">
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-0.5 hover:text-indigo-600">
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Totals & Checkout */}
                    <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Tax (10%)</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all mt-4"
                        >
                            <CreditCard size={18} />
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Package({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M16.5 9.4 7.5 4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
    )
}
