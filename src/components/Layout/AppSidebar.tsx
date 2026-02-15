"use client";

import {
    LayoutDashboard,
    Home,
    Package,
    ShoppingCart,
    BookOpen,
    FileText,
    Users,
    Settings,
    PieChart,
    LogOut,
    CheckSquare
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingCart, label: 'New Sale', href: '/sales' },
    { icon: BookOpen, label: 'Ebooks', href: '/dashboard/ebooks' },
    { icon: Package, label: 'Inventory', href: '/inventory' },
    { icon: CheckSquare, label: 'Approvals', href: '/approvals' },
    { icon: FileText, label: 'Invoices', href: '/invoices' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: PieChart, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white border-r border-slate-800 z-50 flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight">
                    Invoice<span className="text-indigo-400">Pay</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
