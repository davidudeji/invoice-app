import { prisma } from '@/lib/prisma';
import { Prisma, Invoice } from '@prisma/client';

export class InvoiceRepository {
    static async create(data: Prisma.InvoiceUncheckedCreateInput, items: Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput[]): Promise<Invoice> {
        return prisma.invoice.create({
            data: {
                ...data,
                items: {
                    create: items
                }
            },
            include: {
                items: true,
                client: true
            }
        });
    }

    static async update(id: string, userId: string, data: Prisma.InvoiceUpdateInput): Promise<Invoice> {
        return prisma.invoice.update({
            where: { id, userId },
            data,
        });
    }

    static async delete(id: string, userId: string): Promise<Invoice> {
        return prisma.invoice.delete({
            where: { id, userId },
        });
    }

    static async findById(id: string, userId: string) {
        return prisma.invoice.findFirst({
            where: { id, userId },
            include: {
                items: true,
                client: true
            }
        });
    }

    static async findAll(userId: string) {
        return prisma.invoice.findMany({
            where: { userId },
            include: {
                client: true
            },
            orderBy: { date: 'desc' },
        });
    }
}
