import { CustomerService } from '@/services/CustomerService';
import { successResponse, errorResponse } from '@/utils/api-response';

export class CustomerController {

    static async createCustomer(userId: string, data: any) {
        try {
            const customer = await CustomerService.createCustomer(userId, data);
            return successResponse(customer, 'Customer created successfully', 201);
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async updateCustomer(id: string, userId: string, data: any) {
        try {
            const customer = await CustomerService.updateCustomer(id, userId, data);
            return successResponse(customer, 'Customer updated successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async deleteCustomer(id: string, userId: string) {
        try {
            const result = await CustomerService.deleteCustomer(id, userId);
            return successResponse(result, 'Customer deleted successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async getCustomer(id: string, userId: string) {
        try {
            const customer = await CustomerService.getCustomerById(id, userId);
            return successResponse(customer, 'Customer retrieved successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }

    static async listCustomers(userId: string) {
        try {
            const customers = await CustomerService.getCustomers(userId);
            return successResponse(customers, 'Customers retrieved successfully');
        } catch (error) {
            return errorResponse(error);
        }
    }
}
