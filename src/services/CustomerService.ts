import { CustomerRepository } from '@/repositories/CustomerRepository';
import { CustomerCreateSchema, CustomerUpdateSchema } from '@/validators';
import { ApiError } from '@/utils/api-response';

export class CustomerService {
    static async getCustomers(userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);
        return CustomerRepository.findAll(userId);
    }

    static async getCustomerById(id: string, userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);
        const customer = await CustomerRepository.findById(id, userId);
        if (!customer) throw new ApiError('Customer not found', 404);
        return customer;
    }

    static async createCustomer(userId: string, data: any) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const validatedData = CustomerCreateSchema.safeParse(data);
        if (!validatedData.success) {
            throw new ApiError('Validation Error', 400, validatedData.error.flatten().fieldErrors);
        }

        // Business rule: Prevent duplicate emails per user
        const existing = await CustomerRepository.findByEmail(validatedData.data.email, userId);
        if (existing) {
            throw new ApiError('A customer with this email already exists', 409);
        }

        return CustomerRepository.create({
            userId,
            ...validatedData.data
        });
    }

    static async updateCustomer(id: string, userId: string, data: any) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const validatedData = CustomerUpdateSchema.safeParse(data);
        if (!validatedData.success) {
            throw new ApiError('Validation Error', 400, validatedData.error.flatten().fieldErrors);
        }

        const customer = await CustomerRepository.findById(id, userId);
        if (!customer) throw new ApiError('Customer not found', 404);

        return CustomerRepository.update(id, userId, validatedData.data);
    }

    static async deleteCustomer(id: string, userId: string) {
        if (!userId) throw new ApiError('Unauthorized', 401);

        const customer = await CustomerRepository.findById(id, userId);
        if (!customer) throw new ApiError('Customer not found', 404);

        // Repositories automatically handle cascading constraints assuming the DB is set up right
        return CustomerRepository.delete(id, userId);
    }
}
