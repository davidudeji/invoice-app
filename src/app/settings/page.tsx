
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { SettingsTabs } from '@/components/Settings/SettingsTabs';

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/login');
    }

    const settings = await prisma.settings.findUnique({
        where: { userId: session.user.id },
    });

    const taxRates = await prisma.taxRate.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
    });

    const paymentMethods = await prisma.paymentMethod.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-2">Manage your company profile, taxes, and payment methods.</p>
            </div>

            <SettingsTabs
                settings={settings}
                taxRates={taxRates}
                paymentMethods={paymentMethods}
            />
        </div>
    );
}
