export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';
export type ApprovalStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type MatchStatus = 'matched' | 'mismatched' | 'unmatched';

export interface Client {
    id: string;
    name: string;
    email: string;
    address?: string;
    logoUrl?: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

export interface Invoice {
    id: string;
    number: string;
    createdAt: string; // ISO Date
    dueDate: string;   // ISO Date
    status: InvoiceStatus;

    // Advanced Features
    approvalStatus: ApprovalStatus;
    matchStatus: MatchStatus;
    scheduledDate?: string; // ISO Date
    relatedDocuments?: {
        poNumber?: string;
        contractId?: string;
    };

    clientId: string;
    client?: Client; // Populated for UI

    items: InvoiceItem[];

    // Computed values
    subtotal: number;
    taxRate: number; // Percentage (e.g., 10 for 10%)
    taxAmount: number;
    total: number;

    notes?: string;
}

export interface PurchaseOrder {
    id: string;
    number: string;
    vendorId: string; // matches clientId
    totalAmount: number;
    status: 'open' | 'closed';
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    stockQuantity: number;
    categoryId: string;
    imageUrl?: string;
    status: 'active' | 'archived';
    createdAt: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    priceAtAdd: number; // Snapshot of price
}

export interface Ebook {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    coverUrl: string;
    fileUrl?: string; // Only for admin or purchased
    previewUrl?: string; // Publicly accessible
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
}
