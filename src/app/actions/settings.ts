'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// --- Types & Schemas ---

const CompanySettingsSchema = z.object({
    businessName: z.string().optional(),
    logoUrl: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    website: z.string().optional(),
    taxId: z.string().optional(),
    currency: z.string().min(1).default('USD'),
    invoicePrefix: z.string().default('INV-'),
    invoiceFooter: z.string().optional(),
});

const TaxRateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    rate: z.coerce.number().min(0, "Rate must be positive"),
    description: z.string().optional(),
    isDefault: z.boolean().default(false),
});

const PaymentMethodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    details: z.string().optional(),
    isDefault: z.boolean().default(false),
});

export type State = {
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

// --- Actions ---

export async function updateCompanySettings(prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = CompanySettingsSchema.safeParse({
        businessName: formData.get('businessName'),
        logoUrl: formData.get('logoUrl'),
        address: formData.get('address'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        taxId: formData.get('taxId'),
        currency: formData.get('currency'),
        invoicePrefix: formData.get('invoicePrefix'),
        invoiceFooter: formData.get('invoiceFooter'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update settings.',
        };
    }

    try {
        await prisma.settings.upsert({
            where: { userId: session.user.id },
            update: validatedFields.data,
            create: {
                userId: session.user.id,
                ...validatedFields.data,
            },
        });

        revalidatePath('/settings');
        revalidatePath('/invoices/create'); // Settings affect invoice creation
        return { message: 'Settings updated successfully' };
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to update settings.' };
    }
}

export async function createTaxRate(prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = TaxRateSchema.safeParse({
        name: formData.get('name'),
        rate: formData.get('rate'),
        description: formData.get('description'),
        isDefault: formData.get('isDefault') === 'on',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create tax rate.',
        };
    }

    try {
        // If setting as default, unset others first
        if (validatedFields.data.isDefault) {
            await prisma.taxRate.updateMany({
                where: { userId: session.user.id },
                data: { isDefault: false },
            });
        }

        await prisma.taxRate.create({
            data: {
                userId: session.user.id,
                ...validatedFields.data,
            },
        });

        revalidatePath('/settings');
        return { message: 'Tax rate created successfully' };
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create tax rate.' };
    }
}

export async function deleteTaxRate(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { message: 'Not authenticated' };

    try {
        await prisma.taxRate.delete({
            where: { id, userId: session.user.id },
        });
        revalidatePath('/settings');
        return { message: 'Tax rate deleted' };
    } catch (error) {
        return { message: 'Failed to delete tax rate' };
    }
}

export async function createPaymentMethod(prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = PaymentMethodSchema.safeParse({
        name: formData.get('name'),
        details: formData.get('details'),
        isDefault: formData.get('isDefault') === 'on',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create payment method.',
        };
    }

    try {
        if (validatedFields.data.isDefault) {
            await prisma.paymentMethod.updateMany({
                where: { userId: session.user.id },
                data: { isDefault: false },
            });
        }

        await prisma.paymentMethod.create({
            data: {
                userId: session.user.id,
                ...validatedFields.data,
            },
        });

        revalidatePath('/settings');
        return { message: 'Payment method created successfully' };
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create payment method.' };
    }
}

export async function deletePaymentMethod(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { message: 'Not authenticated' };

    try {
        await prisma.paymentMethod.delete({
            where: { id, userId: session.user.id },
        });
        revalidatePath('/settings');
        return { message: 'Payment method deleted' };
    } catch (error) {
        return { message: 'Failed to delete payment method' };
    }
}
