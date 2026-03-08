
'use client';

import { useActionState } from 'react';
import { createClient, State } from '@/app/actions/clients';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';

export default function NewClientPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createClient, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">New Client</h1>
                <p className="text-slate-500 mt-2">Add a new client to your database.</p>
            </div>

            <form action={formAction} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-8 space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">

                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Client Name *</label>
                        <div className="mt-2">
                            <input type="text" name="name" id="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
                        <div className="mt-2">
                            <input type="text" name="companyName" id="companyName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email *</label>
                        <div className="mt-2">
                            <input type="email" name="email" id="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state.errors?.email && <p className="mt-2 text-sm text-red-500">{state.errors.email}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div className="mt-2">
                            <input type="tel" name="phone" id="phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                        <div className="mt-2">
                            <textarea name="address" id="address" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">Website</label>
                        <div className="mt-2">
                            <input type="text" name="website" id="website" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="taxId" className="block text-sm font-medium leading-6 text-gray-900">Tax ID</label>
                        <div className="mt-2">
                            <input type="text" name="taxId" id="taxId" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">Internal Notes</label>
                        <div className="mt-2">
                            <textarea name="notes" id="notes" rows={2} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-x-6">
                    <Link href="/clients" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                    <SubmitButton text="Create Client" loadingText="Creating..." />
                </div>
                {state.message && (
                    <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
            </form>
        </div>
    );
}
