"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle, BookOpen, Star, Zap, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    const tl = gsap.timeline();
    tl.from(".hero-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .from(".hero-image", { y: 100, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

    // Features Animation
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out"
      });
    });

    // Ebook Preview Animation
    gsap.from(".ebook-section", {
      scrollTrigger: {
        trigger: ".ebook-section",
        start: "top 75%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "expo.out"
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">IP</div>
            <span className="font-bold text-xl tracking-tight">InvoicePay</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#ebooks" className="hover:text-indigo-600 transition-colors">Learning</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="hidden md:block px-5 py-2.5 text-slate-600 font-medium hover:text-indigo-600 transition-colors">Log In</Link>
            <Link href="/store" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
              Browse Store
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 hero-text border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: Ebook Store Live in Nigeria 🇳🇬
        </div>

        <h1 className="hero-text text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Master Your Finances.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Scale Your Business.
          </span>
        </h1>

        <p className="hero-text text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed">
          The all-in-one platform for invoicing, inventory, and now—professional growth. Learn the secrets of modern business with our curated ebooks.
        </p>

        <div className="hero-text flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            Get Started Free <ArrowRight size={20} />
          </Link>
          <Link href="/store" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <BookOpen size={20} /> Browse Books
          </Link>
        </div>

        {/* Dashboard Image / Abstract Graphic */}
        <div className="hero-image mt-20 relative w-full max-w-5xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-slate-50 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
            <div className="text-center">
              <TrendingUp size={64} className="text-indigo-600 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400 font-medium">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your business</h2>
            <p className="text-lg text-slate-600">From creating professional invoices to managing inventory and learning new skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Smart Invoicing", desc: "Create, send, and track invoices in seconds. Get paid faster with automated reminders." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Visualize your cash flow, revenue, and expenses with beautiful, easy-to-read charts." },
              { icon: BookOpen, title: "Premium Ebooks", desc: "Access a library of expert guides specifically designed for Nigerian business owners." }
            ].map((feature, i) => (
              <div key={i} className="feature-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ebook Spotlight Section */}
      <section id="ebooks" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="ebook-section bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/40 to-transparent"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold">
                  <Star size={14} fill="currentColor" /> Featured Collection
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Unlock Your Business Potential
                </h2>
                <ul className="space-y-4">
                  {[
                    "Expert strategies from industry leaders",
                    "Localized for the Nigerian market",
                    "Actionable templates and worksheets",
                    "Instant PDF & EPUB download"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-slate-300">
                      <CheckCircle className="text-green-400" size={20} /> {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/store" className="inline-block px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg shadow-white/10">
                    Explore the Library
                  </Link>
                </div>
              </div>

              {/* Visual Representation of Ebooks */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 transform rotate-[-5deg]">
                  <div className="bg-slate-800 rounded-lg h-64 w-full shadow-2xl border border-slate-700/50 p-6 flex flex-col justify-end transform translate-y-8">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 mb-4 opacity-80"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  </div>
                  <div className="bg-indigo-600 rounded-lg h-64 w-full shadow-2xl border border-indigo-500/50 p-6 flex flex-col justify-end">
                    <div className="w-12 h-12 rounded-full bg-white mb-4 opacity-20"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <p className="text-lg text-slate-600 mb-10">Join thousands of businesses managing their finances and growth with InvoicePay.</p>
          <Link href="/dashboard" className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30">
            Create Free Account
          </Link>
          <p className="mt-6 text-sm text-slate-400">No credit card required for basic plan.</p>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} InvoicePay Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
