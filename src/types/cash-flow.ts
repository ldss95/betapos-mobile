export interface CashFlowProps {
	id: string;
	shiftId: string;
	businessId: string;
	amount: number;
	type: 'IN' | 'OUT';
	description: string;
	createdAt: string;
	updatedAt: string;
}
