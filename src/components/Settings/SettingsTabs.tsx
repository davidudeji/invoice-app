
'use client';

import { useState } from 'react';
import { CompanyForm } from './CompanyForm';
import { TaxRatesList } from './TaxRatesList';
import { PaymentMethodsList } from './PaymentMethodsList';

type SettingsTabsProps = {
    settings: any;
    taxRates: any[];
    paymentMethods: any[];
};

export function SettingsTabs({ settings, taxRates, paymentMethods }: SettingsTabsProps) {
    const [activeTab, setActiveTab] = useState('company');

    const tabs = [
        { id: 'company', label: 'Company Profile' },
        { id: 'tax', label: 'Tax Settings' },
        { id: 'payment', label: 'Payment Methods' },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === 'company' && <CompanyForm settings={settings} />}
                {activeTab === 'tax' && <TaxRatesList taxRates={taxRates} />}
                {activeTab === 'payment' && <PaymentMethodsList paymentMethods={paymentMethods} />}
            </div>
        </div>
    );
}
