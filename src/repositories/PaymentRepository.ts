import { prisma } from '@/lib/prisma';
import { Prisma, PaymentMethod } from '@prisma/client';

export class PaymentRepository {
    static async create(data: Prisma.PaymentMethodUncheckedCreateInput): Promise<PaymentMethod> {
        return prisma.paymentMethod.create({ data });
    }

    static async findById(id: string, userId: string): Promise<PaymentMethod | null> {
        return prisma.paymentMethod.findFirst({
            where: { id, userId },
        });
    }

    static async findAll(userId: string): Promise<PaymentMethod[]> {
        return prisma.paymentMethod.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
