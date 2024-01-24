import { ProviderProps } from './provider';
import { UserProps } from './user';

export interface ExpenseProps {
	id: string;
	businessId: string;
	providerId: string | null;
	provider: ProviderProps | null;
	date: string;
	amount: number;
	itbis: number;
	categoryId: string;
	category: ExpenseCategoryProps;
	description: string;
	ncf: string | null;
	docNumber: string | null;
	paymentMethodId: string;
	paymentMethod: ExpensePaymentMethodProps;
	userId: string;
	user: UserProps;
	attachedDocumentUrl: string | null;
	notes: string | null;
	type: 'SERVICES' | 'PRODUCTS';
	createdAt: string;
	updatedAt: string;
}

export interface ExpenseCategoryProps {
	id: string;
	name: string;
	description: string;
}

export interface ExpensePaymentMethodProps {
	id: string;
	name: string;
}

export enum ExpensesFilter {
	Today = 'today',
	ThisWeek = 'week',
	ThisMonth = 'month'
}
