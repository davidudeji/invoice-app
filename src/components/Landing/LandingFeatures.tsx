import { Scan, Zap, PieChart } from "lucide-react";

export function LandingFeatures() {
    const features = [
        {
            icon: Scan,
            title: "Smart Capture",
            description: "Upload any invoice PDF or image. Our AI extracts vendor details, amounts, and due dates instantly."
        },
        {
            icon: Zap,
            title: "Instant Matching",
            description: "Automatically match invoices to purchase orders. Detect discrepancies and duplicates before they cost you."
        },
        {
            icon: PieChart,
            title: "Real-time Insights",
            description: "Track cash flow, outstanding payments, and vendor spending in a beautiful, live dashboard."
        }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to manage spend</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Stop using spreadsheets. Upgrade to a modern financial stack.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
