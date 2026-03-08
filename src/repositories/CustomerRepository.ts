import { prisma } from '@/lib/prisma';
import { Prisma, Client } from '@prisma/client';

export class CustomerRepository {
    static async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
        return prisma.client.create({ data });
    }

    static async update(id: string, userId: string, data: Prisma.ClientUpdateInput): Promise<Client> {
        return prisma.client.update({
            where: { id, userId },
            data,
        });
    }

    static async delete(id: string, userId: string): Promise<Client> {
        return prisma.client.delete({
            where: { id, userId },
        });
    }

    static async findById(id: string, userId: string): Promise<Client | null> {
        return prisma.client.findFirst({
            where: { id, userId },
        });
    }

    static async findAll(userId: string): Promise<Client[]> {
        return prisma.client.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    static async findByEmail(email: string, userId: string): Promise<Client | null> {
        return prisma.client.findFirst({
            where: { email, userId },
        });
    }
}
