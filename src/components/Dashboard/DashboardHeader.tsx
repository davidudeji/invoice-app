"use client";

import { Bell, Search, ChevronDown, User, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

export function DashboardHeader() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const user = session?.user;
    const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : (user?.email ? user.email[0].toUpperCase() : 'U');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-brand-border sticky top-0 z-40">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search invoices, clients, or payments..."
                        className="w-full bg-brand-bg border border-brand-border rounded-lg pl-10 pr-4 py-2 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-500 hover:bg-brand-bg hover:text-brand-text rounded-full transition-colors group">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-brand-border"></div>

                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer hover:bg-brand-bg p-1.5 rounded-lg transition-colors"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {user?.image ? (
                            <img src={user.image} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-brand-border" />
                        ) : (
                            <div className="h-9 w-9 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold border border-brand-primary/20">
                                {initials}
                            </div>
                        )}
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-brand-primary leading-tight">{user?.name || user?.email || 'Guest'}</p>
                            <p className="text-xs text-brand-text">Admin</p>
                        </div>
                        <ChevronDown size={16} className="text-slate-400" />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-brand-border py-1 z-50">
                            <div className="px-4 py-2 border-b border-brand-border/50 mb-1">
                                <p className="text-sm font-medium text-brand-primary truncate">{user?.name || 'Account'}</p>
                                <p className="text-xs text-brand-text truncate">{user?.email}</p>
                            </div>
                            <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-brand-text hover:bg-brand-bg hover:text-brand-primary transition-colors">
                                <User size={16} /> Profile
                            </Link>
                            <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-brand-text hover:bg-brand-bg hover:text-brand-primary transition-colors">
                                <SettingsIcon size={16} /> Settings
                            </Link>
                            <div className="h-px bg-brand-border/50 my-1"></div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
