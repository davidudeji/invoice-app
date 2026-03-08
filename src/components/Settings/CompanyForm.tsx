
'use client';

import { useActionState } from 'react';
import { updateCompanySettings, State } from '@/app/actions/settings';
import { SubmitButton } from '@/components/SubmitButton';

export function CompanyForm({ settings }: { settings: any }) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(updateCompanySettings, initialState);

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Company Profile</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Update your company details which will appear on invoices.</p>
                </div>

                <form action={formAction} className="mt-5 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-gray-900">
                                Business Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="businessName"
                                    id="businessName"
                                    defaultValue={settings?.businessName || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="logoUrl" className="block text-sm font-medium leading-6 text-gray-900">
                                Logo URL
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="logoUrl"
                                    id="logoUrl"
                                    defaultValue={settings?.logoUrl || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    defaultValue={settings?.address || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    defaultValue={settings?.email || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    defaultValue={settings?.phone || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                Website
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="website"
                                    id="website"
                                    defaultValue={settings?.website || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="taxId" className="block text-sm font-medium leading-6 text-gray-900">
                                Tax ID / CAC Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="taxId"
                                    id="taxId"
                                    defaultValue={settings?.taxId || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
                                Currency
                            </label>
                            <div className="mt-2">
                                <select
                                    id="currency"
                                    name="currency"
                                    defaultValue={settings?.currency || 'USD'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="NGN">NGN (₦)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="invoicePrefix" className="block text-sm font-medium leading-6 text-gray-900">
                                Invoice Prefix
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="invoicePrefix"
                                    id="invoicePrefix"
                                    defaultValue={settings?.invoicePrefix || 'INV-'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="invoiceFooter" className="block text-sm font-medium leading-6 text-gray-900">
                                Invoice Footer Message
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="invoiceFooter"
                                    name="invoiceFooter"
                                    rows={2}
                                    defaultValue={settings?.invoiceFooter || ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end gap-x-3">
                            <SubmitButton text="Save Settings" loadingText="Saving..." />
                        </div>
                        {state.message && (
                            <p className={`mt-2 text-sm ${state.errors ? 'text-red-500' : 'text-green-500'}`}>
                                {state.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
