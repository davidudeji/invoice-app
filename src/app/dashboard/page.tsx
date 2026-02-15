"use client";

import { StatCard } from '@/components/Dashboard/StatCard';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { RecentInvoicesTable } from '@/components/Dashboard/RecentInvoicesTable';
import { CashFlowChart } from '@/components/Dashboard/CashFlowChart';
import { useInvoiceStore } from '@/lib/store';
import Link from 'next/link';
import { DollarSign, FileCheck, Clock, TrendingUp, Plus, Users, Send } from 'lucide-react';

export default function Dashboard() {
    const { getStats } = useInvoiceStore();
    const stats = getStats();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <AppSidebar />

            <main className="pl-64 min-h-screen flex flex-col">
                <DashboardHeader />

                <div className="p-8 max-w-[1600px] mx-auto w-full space-y-8">

                    {/* Welcome Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/clients" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                                <Users size={16} />
                                <span>Add Client</span>
                            </Link>
                            <Link href="/invoices/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                                <Plus size={16} />
                                <span>New Invoice</span>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Total Revenue"
                            value={`$${stats.totalRevenue.toLocaleString()}`}
                            trend="12.5%"
                            trendUp={true}
                            icon={DollarSign}
                            color="indigo"
                        />
                        <StatCard
                            label="Paid Invoices"
                            value={stats.paidCount.toString()}
                            trend="8.1%"
                            trendUp={true}
                            icon={FileCheck}
                            color="emerald"
                        />
                        <StatCard
                            label="Pending Amount"
                            value={`$${stats.pendingAmount.toLocaleString()}`}
                            trend="2.3%"
                            trendUp={false}
                            icon={Clock}
                            color="amber"
                        />
                        <StatCard
                            label="Pending Count"
                            value={stats.pendingCount.toString()}
                            trend={stats.pendingCount > 0 ? "Active" : "Stable"}
                            trendUp={true}
                            icon={TrendingUp}
                            color="purple"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Left Column: Recent Invoices (2/3 width on large screens) */}
                        <div className="xl:col-span-2">
                            <RecentInvoicesTable />
                        </div>

                        {/* Right Column: Cash Flow & Quick Actions (1/3 width) */}
                        <div className="space-y-8">
                            <div className="h-80">
                                <CashFlowChart />
                            </div>

                            {/* Quick Actions / Tips Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-indigo-400/20 blur-3xl"></div>

                                <h3 className="font-bold text-lg mb-2 relative z-10">Pro Tip</h3>
                                <p className="text-indigo-100 text-sm mb-6 relative z-10">
                                    Did you know you can set up recurring invoices to automate your monthly billing?
                                </p>
                                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 relative z-10">
                                    <Send size={16} />
                                    <span>Set up Automation</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
