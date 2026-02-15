import { create } from 'zustand';
import { Invoice, Client, PurchaseOrder, Product, Category, CartItem, Ebook } from '@/types';

interface InvoiceState {
    invoices: Invoice[];
    clients: Client[];
    purchaseOrders: PurchaseOrder[];
    products: Product[];
    categories: Category[];
    cart: CartItem[];
    ebooks: Ebook[];

    // Actions
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
    deleteInvoice: (id: string) => void;
    addClient: (client: Client) => void;

    // Ebook Actions
    addEbook: (ebook: Ebook) => void;
    updateEbook: (id: string, ebook: Partial<Ebook>) => void;
    deleteEbook: (id: string) => void;

    // Inventory Actions
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    // Cart Actions
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

    // Advanced Actions
    autoMatchInvoice: (invoiceId: string) => void;
    submitForApproval: (invoiceId: string) => void;
    approveInvoice: (invoiceId: string) => void;
    rejectInvoice: (invoiceId: string) => void;

    // Computed (getters)
    getStats: () => {
        totalRevenue: number;
        pendingCount: number;
        pendingAmount: number;
        paidCount: number;
        approvalPendingCount: number;
    };
}

// Mock Data for specific clients
const INITIAL_CLIENTS: Client[] = [
    { id: 'c1', name: 'Acme Corp', email: 'billing@acme.com', address: '123 Acme Way' },
    { id: 'c2', name: 'Globex Inc', email: 'accounts@globex.com', address: '456 Globex St' },
    { id: 'c3', name: 'Soylent Corp', email: 'finance@soylent.com', address: '789 People Place' },
];

const INITIAL_POS: PurchaseOrder[] = [
    { id: 'po1', number: 'PO-001', vendorId: 'c1', totalAmount: 5000, status: 'open', createdAt: new Date().toISOString() },
    { id: 'po2', number: 'PO-002', vendorId: 'c2', totalAmount: 1200, status: 'open', createdAt: new Date().toISOString() },
];

const INITIAL_CATEGORIES: Category[] = [
    { id: 'cat1', name: 'Services' },
    { id: 'cat2', name: 'Hardware' },
    { id: 'cat3', name: 'Subscriptions' },
];

const INITIAL_PRODUCTS: Product[] = [
    { id: 'p1', name: 'Web Development', description: 'Hourly development rate', sku: 'SVC-WEB-001', price: 150, stockQuantity: 9999, categoryId: 'cat1', status: 'active', createdAt: new Date().toISOString() },
    { id: 'p2', name: 'Server Setup', description: 'Initial server configuration', sku: 'SVC-SRV-001', price: 500, stockQuantity: 9999, categoryId: 'cat1', status: 'active', createdAt: new Date().toISOString() },
    { id: 'p3', name: 'Laptop Pro', description: 'High-end developer laptop', sku: 'HW-LAP-001', price: 2500, stockQuantity: 15, categoryId: 'cat2', status: 'active', createdAt: new Date().toISOString() },
];

const INITIAL_EBOOKS: Ebook[] = [
    { id: 'e1', title: 'Mastering Modern Payments', author: 'FinTech Pro', description: 'A complete guide to digital payments in Nigeria.', price: 5000, coverUrl: '/ebook-cover-1.jpg', status: 'published', createdAt: new Date().toISOString() },
    { id: 'e2', title: 'Invoice like a Pro', author: 'BizGuru', description: 'Get paid faster with better invoices.', price: 2500, coverUrl: '/ebook-cover-2.jpg', status: 'published', createdAt: new Date().toISOString() },
];

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
    invoices: [],
    clients: INITIAL_CLIENTS,
    purchaseOrders: INITIAL_POS,
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    cart: [],
    ebooks: INITIAL_EBOOKS,

    addInvoice: (invoice) => set((state) => ({
        invoices: [invoice, ...state.invoices]
    })),

    updateInvoice: (id, updated) => set((state) => ({
        invoices: state.invoices.map((inv) =>
            inv.id === id ? { ...inv, ...updated } : inv
        )
    })),

    deleteInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter((inv) => inv.id !== id)
    })),

    addClient: (client) => set((state) => ({
        clients: [...state.clients, client]
    })),

    addEbook: (ebook) => set((state) => ({
        ebooks: [ebook, ...state.ebooks]
    })),

    updateEbook: (id, updated) => set((state) => ({
        ebooks: state.ebooks.map((e) => e.id === id ? { ...e, ...updated } : e)
    })),

    deleteEbook: (id) => set((state) => ({
        ebooks: state.ebooks.filter((e) => e.id !== id)
    })),

    addProduct: (product) => set((state) => ({
        products: [product, ...state.products]
    })),

    updateProduct: (id, updated) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updated } : p)
    })),

    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
    })),

    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(i => i.productId === item.productId);
        if (existingItem) {
            return {
                cart: state.cart.map(i =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                )
            };
        }
        return { cart: [...state.cart, item] };
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(i => i.productId !== productId)
    })),

    updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(i =>
            i.productId === productId ? { ...i, quantity } : i
        )
    })),

    clearCart: () => set({ cart: [] }),

    autoMatchInvoice: (invoiceId) => set((state) => {
        const invoice = state.invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return state;

        // Simple match logic: Find PO with same Vendor + Similar Amount (within 1%)
        const matchedPO = state.purchaseOrders.find(po =>
            po.vendorId === invoice.clientId &&
            Math.abs(po.totalAmount - invoice.total) < (invoice.total * 0.01)
        );

        const updatedInvoice: Invoice = {
            ...invoice,
            matchStatus: matchedPO ? 'matched' : 'mismatched',
            relatedDocuments: matchedPO ? { poNumber: matchedPO.number } : undefined
        };

        return {
            invoices: state.invoices.map(inv => inv.id === invoiceId ? updatedInvoice : inv)
        };
    }),

    submitForApproval: (invoiceId) => set((state) => {
        // Auto-approve if < 1000 and matched
        const invoice = state.invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return state;

        const isSmallAmount = invoice.total < 1000;
        const isMatched = invoice.matchStatus === 'matched';

        const newStatus = (isSmallAmount && isMatched) ? 'approved' : 'pending';

        return {
            invoices: state.invoices.map(inv => inv.id === invoiceId ? { ...inv, approvalStatus: newStatus } : inv)
        };
    }),

    approveInvoice: (invoiceId) => set((state) => ({
        invoices: state.invoices.map(inv =>
            inv.id === invoiceId ? {
                ...inv,
                approvalStatus: 'approved',
                scheduledDate: inv.dueDate // Auto-schedule on approval
            } : inv
        )
    })),

    rejectInvoice: (invoiceId) => set((state) => ({
        invoices: state.invoices.map(inv =>
            inv.id === invoiceId ? { ...inv, approvalStatus: 'rejected' } : inv
        )
    })),

    getStats: () => {
        const { invoices } = get();
        return invoices.reduce((acc, inv) => {
            if (inv.status === 'paid') {
                acc.totalRevenue += inv.total;
                acc.paidCount += 1;
            }
            if (inv.status === 'pending' || inv.status === 'overdue') {
                acc.pendingAmount += inv.total;
                acc.pendingCount += 1;
            }
            if (inv.approvalStatus === 'pending') {
                acc.approvalPendingCount += 1;
            }
            return acc;
        }, { totalRevenue: 0, pendingCount: 0, pendingAmount: 0, paidCount: 0, approvalPendingCount: 0 });
    }
}));
