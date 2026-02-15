import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LandingHero() {
    return (
        <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-700 text-indigo-300 text-xs font-medium mb-8">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Now with Smart Invoice Capture
                </div>

                <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
                    Getting paid shouldn't be <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">a full-time job.</span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Automate your invoicing, track payments in real-time, and get paid 3x faster.
                    Built for freelancers and agencies who value their time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                        Get Started for Free
                        <ArrowRight size={20} />
                    </Link>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all">
                        View Demo
                    </button>
                </div>
            </div>
        </section>
    );
}
