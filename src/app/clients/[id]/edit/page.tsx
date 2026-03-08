import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ClientEditForm from './ClientEditForm';

export default async function EditClientPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/login');
    }

    const { id } = await params;

    const client = await prisma.client.findUnique({
        where: { id, userId: session.user.id },
    });

    if (!client) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Client</h1>
                <p className="text-slate-500 mt-2">Update client details.</p>
            </div>
            <ClientEditForm client={client} />
        </div>
    );
}
