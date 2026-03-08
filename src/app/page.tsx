"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, ShieldCheck, BarChart3, Clock, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.from(".hero-element", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Dashboard Preview Animation
    gsap.from(".dashboard-preview", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    });

    // Fade up sections
    gsap.utils.toArray<HTMLElement>(".section-fade-up").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Feature Cards stagger
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 75%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-brand-bg font-sans text-brand-text overflow-x-hidden selection:bg-brand-accent/20 selection:text-brand-primary">

      {/* Sticky Navigation */}
      <nav className="fixed w-full z-50 bg-brand-bg/80 border-b border-brand-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/invoice-logo.png" alt="InvoicePay Logo" className="h-8 w-auto object-contain " sizes="5" />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-brand-text">
            <a href="#features" className="hover:text-brand-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-medium rounded-lg transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="hero-element inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-border text-sm font-medium text-brand-primary mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
          Financial operations, simplified.
        </div>

        <h1 className="hero-element text-5xl md:text-7xl font-extrabold tracking-tight text-brand-primary mb-6 leading-tight max-w-4xl">
          The intelligent financial stack for modern teams.
        </h1>

        <p className="hero-element text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate invoicing, track payments globally, and get crystal-clear insights into your cash flow. Built for reliability, designed for speed.
        </p>

        <div className="hero-element flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard" className="px-8 py-3.5 bg-brand-accent text-white rounded-lg font-medium text-base hover:bg-brand-accent/90 transition-all shadow-md shadow-brand-accent/20 flex items-center justify-center gap-2">
            Start for free <ArrowRight size={18} />
          </Link>
          <a href="#features" className="px-8 py-3.5 bg-white border border-brand-border text-brand-primary rounded-lg font-medium text-base hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            Explore platform
          </a>
        </div>

        {/* Abstract Dashboard Preview */}
        <div className="dashboard-preview mt-20 relative w-full max-w-5xl mx-auto">
          {/* Subtle glow behind dashboard */}
          <div className="absolute -inset-1 bg-gradient-to-b from-brand-border/40 to-transparent blur-2xl rounded-[32px] -z-10"></div>

          <div className="relative bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden flex flex-col">
            {/* Dashboard Header Bar */}
            <div className="h-14 border-b border-brand-border flex items-center px-6 gap-4 bg-gray-50/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                <div className="w-3 h-3 rounded-full bg-brand-border"></div>
              </div>
              <div className="h-6 w-64 bg-white border border-brand-border rounded-md ml-4"></div>
            </div>

            {/* Dashboard Body */}
            <div className="flex h-[400px]">
              {/* Sidebar Mock */}
              <div className="w-64 border-r border-brand-border p-6 hidden md:block">
                <div className="h-4 w-24 bg-brand-border/50 rounded mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-8 rounded-md ${i === 1 ? 'bg-brand-primary/5 border border-brand-primary/10' : 'bg-transparent'}`}></div>
                  ))}
                </div>
              </div>
              {/* Main Content Mock */}
              <div className="flex-1 p-8 bg-gray-50/30">
                <div className="flex justify-between items-center mb-8">
                  <div className="h-6 w-48 bg-brand-primary/10 rounded"></div>
                  <div className="h-10 w-32 bg-brand-accent rounded-lg opacity-90"></div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white border border-brand-border rounded-xl shadow-sm p-5 flex flex-col justify-between">
                      <div className="h-4 w-1/2 bg-brand-border/50 rounded"></div>
                      <div className="h-8 w-3/4 bg-brand-primary/20 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="h-48 bg-white border border-brand-border rounded-xl shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="section-fade-up text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4 tracking-tight">Everything required to run billing</h2>
          <p className="text-lg text-brand-text">A complete toolkit engineered for accuracy, speed, and trust.</p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Enterprise-level encryption and security protocols keep your financial data protected around the clock." },
            { icon: BarChart3, title: "Real-time Analytics", desc: "Gain up-to-the-minute visibility into your revenue streams, outstanding balances, and cash flow." },
            { icon: Clock, title: "Automated Workflows", desc: "Set up auto-reminders and recurring invoices so you never have to chase a payment manually again." },
            { icon: CreditCard, title: "Global Payments", desc: "Accept payments from clients anywhere in the world with integrated, seamless payment gateways." },
            { icon: CheckCircle2, title: "Smart Reconciliation", desc: "Automatically match payments to invoices, reducing manual data entry and accounting errors." },
            { icon: ArrowRight, title: "API First", desc: "Integrate billing flows directly into your own product or stack with our robust API capabilities." }
          ].map((feature, i) => (
            <div key={i} className="feature-card bg-white p-8 rounded-2xl shadow-sm border border-brand-border hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-gray-50 border border-brand-border text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <feature.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-brand-primary mb-2">{feature.title}</h3>
              <p className="text-brand-text leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Feature Section - Analytics */}
      <section className="py-24 bg-white border-y border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="section-fade-up space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text uppercase tracking-wider">
                Financial Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-brand-primary tracking-tight">
                Understand your revenue at a glance.
              </h2>
              <p className="text-lg text-brand-text leading-relaxed">
                Stop guessing about your cash flow. Our intelligent dashboard translates raw invoice data into clear, actionable financial reporting. Monitor growth, track outstanding debts, and forecast future revenue with precision.
              </p>
              <ul className="space-y-4">
                {["Visual cash flow projections", "Top client revenue breakdowns", "Instant PDF & CSV data exports", "Custom date range filtering"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-primary font-medium">
                    <CheckCircle2 className="text-brand-accent" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-accent transition-colors">
                  View full reports <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Visual element */}
            <div className="section-fade-up relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg to-white rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white border border-brand-border shadow-xl rounded-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="h-6 w-32 bg-gray-100 rounded mb-8"></div>
                <div className="flex items-end gap-3 h-48 mb-6">
                  {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group">
                      <div className="w-full relative">
                        <div
                          className="w-full bg-brand-primary rounded-t-sm transition-all duration-300 group-hover:bg-brand-accent"
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brand-border pt-4 mt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-brand-text">Net Revenue</span>
                    <span className="font-bold text-brand-primary text-xl">$42,500.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="section-fade-up text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-lg text-brand-text">Start for free, upgrade when you need advanced features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="section-fade-up bg-white p-8 rounded-3xl border border-brand-border shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-brand-primary mb-2">Starter</h3>
            <p className="text-sm text-brand-text mb-6">Perfect for freelancers and new businesses.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-brand-primary">$0</span>
              <span className="text-brand-text">/month</span>
            </div>
            <Link href="/dashboard" className="w-full py-3 mb-8 bg-brand-bg text-brand-primary border border-brand-border rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
            <ul className="space-y-4 flex-1">
              {["Up to 10 invoices/month", "Basic client management", "Standard email support", "Paystack/Stripe integration"].map(feature => (
                <li key={feature} className="flex items-start gap-3 text-sm text-brand-text">
                  <CheckCircle2 className="text-brand-accent shrink-0 mt-0.5" size={18} /> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="section-fade-up bg-brand-primary p-8 rounded-3xl border border-brand-primary shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
            <p className="text-sm text-gray-300 mb-6">For growing teams requiring advanced tools.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">$15</span>
              <span className="text-gray-300">/month</span>
            </div>
            <Link href="/dashboard" className="w-full py-3 mb-8 bg-brand-accent text-white rounded-lg font-semibold text-center hover:bg-brand-accent/90 transition-colors shadow-sm">
              Start 14-day free trial
            </Link>
            <ul className="space-y-4 flex-1">
              {["Unlimited invoices", "Advanced analytics & reporting", "Custom branding & domains", "Automated reminders", "Priority 24/7 support"].map(feature => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-200">
                  <CheckCircle2 className="text-brand-accent shrink-0 mt-0.5" size={18} /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-fade-up text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-primary mb-4 tracking-tight">Trusted by fast-growing companies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "InvoicePay completely transformed how we handle billing. What used to take days of reconciliation now happens automatically.", author: "Sarah Jenkins", role: "CFO at TechNova" },
              { quote: "The interface is incredibly intuitive. I set up my company profile, tax rates, and sent my first invoice in under 5 minutes.", author: "David Udeji", role: "Founder at StudioDesign" },
              { quote: "The financial reporting gives us exact clarity on our cash flow. It feels like a premium banking dashboard.", author: "Michael Chen", role: "Director of Ops" }
            ].map((t, i) => (
              <div key={i} className="section-fade-up bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
                <div className="flex gap-1 mb-6 text-brand-accent">
                  {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-brand-primary font-medium text-lg leading-relaxed mb-8">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-brand-primary">{t.author}</p>
                  <p className="text-sm text-brand-text">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center section-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Ready to streamline your finances?</h2>
          <p className="text-lg text-brand-text mb-10 max-w-2xl mx-auto">Join thousands of modern businesses managing their billing, revenue, and growth with InvoicePay.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="px-8 py-4 bg-brand-primary text-white rounded-lg font-medium text-base hover:bg-brand-primary/90 transition-all shadow-lg flex items-center justify-center gap-2">
              Create Free Account
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white border border-brand-border text-brand-primary rounded-lg font-medium text-base hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              Talk to Sales
            </Link>
          </div>
          <p className="mt-6 text-sm text-brand-text">No credit card required. 14-day trial on Pro plans.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-bg border-t border-brand-border py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2 md:col-span-1">
              <img src="/invoice-logo.png" alt="InvoicePay Logo" className="h-6 w-auto object-contain mb-6 grayscale opacity-80" />
              <p className="text-sm text-brand-text max-w-xs">
                The modern financial stack for fast-growing businesses. Built for reliability and precision.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-primary mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-brand-text flex flex-col">
                <Link href="/features" className="hover:text-brand-primary transition-colors">Features</Link>
                <Link href="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
                <Link href="/integrations" className="hover:text-brand-primary transition-colors">Integrations</Link>
                <Link href="/changelog" className="hover:text-brand-primary transition-colors">Changelog</Link>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-primary mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-brand-text flex flex-col">
                <Link href="/docs" className="hover:text-brand-primary transition-colors">Documentation</Link>
                <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
                <Link href="/guides" className="hover:text-brand-primary transition-colors">Guides</Link>
                <Link href="/help" className="hover:text-brand-primary transition-colors">Help Center</Link>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-primary mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-brand-text flex flex-col">
                <Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link>
                <Link href="/careers" className="hover:text-brand-primary transition-colors">Careers</Link>
                <Link href="/legal" className="hover:text-brand-primary transition-colors">Legal & Privacy</Link>
                <Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-text text-sm">&copy; {new Date().getFullYear()} InvoicePay Inc. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-brand-border/50 hover:bg-brand-border transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-brand-border/50 hover:bg-brand-border transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-brand-border/50 hover:bg-brand-border transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
