export interface BillProps {
	id: string;
	businessId: string;
	orderNumber: string;
	stripePayUrl?: string;
	invoicePdfUrl: string | null;
	receiptPdfUrl: string | null;
	transferVoucherUrl?: string;
	amount: number;
	description: string;
	payed: boolean;
	payedAt: string;
	createdAt: string;
	updatedAt: string;
}
