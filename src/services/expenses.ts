import dayjs from 'dayjs';

import {
	ExpenseCategoryProps,
	ExpensePaymentMethodProps,
	ExpenseProps,
	ExpensesFilter
} from '@/types/expense';
import http from '@/utils/http';

export async function fetchExpenses(filter: ExpensesFilter) {
	const { data } = await http.get<ExpenseProps[]>('/expenses', {
		params: {
			filters: {
				...(filter === ExpensesFilter.Today && {
					dateFrom: dayjs().format('YYYY-MM-DD'),
					dateTo: dayjs().format('YYYY-MM-DD')
				}),
				...(filter === ExpensesFilter.ThisMonth && {
					dateFrom: dayjs().startOf('month').format('YYYY-MM-DD'),
					dateTo: dayjs().endOf('month').format('YYYY-MM-DD')
				}),
				...(filter === ExpensesFilter.ThisWeek && {
					dateFrom: dayjs().startOf('week').format('YYYY-MM-DD'),
					dateTo: dayjs().endOf('week').format('YYYY-MM-DD')
				})
			}
		}
	});

	return data;
}

export async function fetchExpensesPaymentMethods() {
	const { data } = await http.get<ExpensePaymentMethodProps[]>('/expenses/payment-methods');
	return data;
}

export async function fetchExpensesCategories() {
	const { data } = await http.get<ExpenseCategoryProps[]>('/expenses/categories');
	return data;
}

export async function saveExpense(data: ExpenseProps) {
	await http.post('/expenses', data);
}
