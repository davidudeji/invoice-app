
'use client';

import { useActionState, useState } from 'react';
import { createTaxRate, deleteTaxRate, State } from '@/app/actions/settings';
import { SubmitButton } from '@/components/SubmitButton';
import { TrashIcon } from 'lucide-react';

export function TaxRatesList({ taxRates }: { taxRates: any[] }) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createTaxRate, initialState);

    // Optimistic UI could be added here, but for MVP we rely on server revalidation

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await deleteTaxRate(id);
        }
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Tax Rates</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Define tax rates to apply to invoices (e.g., VAT, GST).</p>
                </div>

                <div className="mt-6 border-t border-gray-100">
                    <ul role="list" className="divide-y divide-gray-100">
                        {taxRates.map((tax) => (
                            <li key={tax.id} className="flex gap-x-4 py-5 items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{tax.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {tax.rate}% {tax.isDefault && <span className="text-indigo-600 font-medium">(Default)</span>}
                                    </p>
                                    {tax.description && <p className="text-xs text-gray-400">{tax.description}</p>}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(tax.id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {taxRates.length === 0 && (
                            <li className="py-5 text-center text-sm text-gray-500">No tax rates added yet.</li>
                        )}
                    </ul>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-medium text-gray-900">Add New Tax Rate</h4>
                    <form action={formAction} className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="tax-name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-1">
                                    <input type="text" name="name" id="tax-name" required placeholder="e.g. VAT" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="tax-rate" className="block text-sm font-medium leading-6 text-gray-900">Rate (%)</label>
                                <div className="mt-1">
                                    <input type="number" step="0.01" name="rate" id="tax-rate" required placeholder="7.5" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="tax-desc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div className="mt-1">
                                    <input type="text" name="description" id="tax-desc" placeholder="Optional description" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-6 flex items-center">
                                <input id="tax-default" name="isDefault" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label htmlFor="tax-default" className="ml-2 block text-sm text-gray-900">Set as default</label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <SubmitButton text="Add Tax Rate" loadingText="Adding..." />
                        </div>
                        {state.message && (
                            <p className={`mt-2 text-sm ${Object.keys(state.errors || {}).length > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {state.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
