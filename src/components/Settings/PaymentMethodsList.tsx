
'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPaymentMethod, deletePaymentMethod, State } from '@/app/actions/settings';
import { SubmitButton } from '@/components/SubmitButton';
import { TrashIcon } from 'lucide-react';

export function PaymentMethodsList({ paymentMethods }: { paymentMethods: any[] }) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState(createPaymentMethod, initialState);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await deletePaymentMethod(id);
        }
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Payment Methods</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Add bank accounts or payment instructions for your invoices.</p>
                </div>

                <div className="mt-6 border-t border-gray-100">
                    <ul role="list" className="divide-y divide-gray-100">
                        {paymentMethods.map((pm) => (
                            <li key={pm.id} className="flex gap-x-4 py-5 items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{pm.name}</p>
                                    {pm.isDefault && <span className="text-indigo-600 text-xs font-medium">(Default)</span>}
                                    {pm.details && <p className="text-xs text-gray-500 whitespace-pre-line mt-1">{pm.details}</p>}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(pm.id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {paymentMethods.length === 0 && (
                            <li className="py-5 text-center text-sm text-gray-500">No payment methods added yet.</li>
                        )}
                    </ul>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-medium text-gray-900">Add New Payment Method</h4>
                    <form action={formAction} className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="pm-name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-1">
                                    <input type="text" name="name" id="pm-name" required placeholder="e.g. Bank Transfer (GtBank)" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="pm-details" className="block text-sm font-medium leading-6 text-gray-900">Details / Account Info</label>
                                <div className="mt-1">
                                    <textarea name="details" id="pm-details" rows={3} placeholder="Account Name: ...&#10;Account Number: ...&#10;Bank: ..." className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-6 flex items-center">
                                <input id="pm-default" name="isDefault" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label htmlFor="pm-default" className="ml-2 block text-sm text-gray-900">Set as default</label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <SubmitButton text="Add Payment Method" loadingText="Adding..." />
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
