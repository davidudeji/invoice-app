"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-slate-200 sticky top-0 z-40">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search invoices, clients, or payments..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-full transition-colors group">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                    <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                        JD
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-slate-900 leading-tight">John Doe</p>
                        <p className="text-xs text-slate-500">Admin</p>
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
            </div>
        </header>
    );
}
