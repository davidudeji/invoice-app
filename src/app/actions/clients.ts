'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ClientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    companyName: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    taxId: z.string().optional(),
    notes: z.string().optional(),
});

export type State = {
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

export async function createClient(prevState: State, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = ClientSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        companyName: formData.get('companyName'),
        address: formData.get('address'),
        website: formData.get('website'),
        taxId: formData.get('taxId'),
        notes: formData.get('notes'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create client.',
        };
    }

    try {
        const existingClient = await prisma.client.findFirst({
            where: {
                userId: session.user.id,
                email: validatedFields.data.email
            }
        });

        if (existingClient) {
            return { message: 'A client with this email already exists.' };
        }

        await prisma.client.create({
            data: {
                userId: session.user.id,
                ...validatedFields.data,
            },
        });
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create client.' };
    }

    revalidatePath('/clients');
    redirect('/clients');
}

export async function updateClient(
    id: string,
    prevState: State,
    formData: FormData
) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = ClientSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        companyName: formData.get('companyName'),
        address: formData.get('address'),
        website: formData.get('website'),
        taxId: formData.get('taxId'),
        notes: formData.get('notes'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update client.',
        };
    }

    try {
        const existingClient = await prisma.client.findFirst({
            where: {
                userId: session.user.id,
                email: validatedFields.data.email,
                NOT: { id: id }
            }
        });

        if (existingClient) {
            return { message: 'A client with this email already exists.' };
        }

        await prisma.client.update({
            where: { id: id, userId: session.user.id },
            data: validatedFields.data,
        });
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to update client.' };
    }

    revalidatePath(`/clients/${id}`);
    revalidatePath('/clients');
    redirect(`/clients/${id}`);
}

export async function deleteClient(id: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Not authenticated');
    }

    try {
        await prisma.client.delete({
            where: { id: id, userId: session.user.id },
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Database Error: Failed to delete client.');
    }

    revalidatePath('/clients');
    redirect('/clients');
}
