import { useEffect, useState } from 'react';

import { ApiError } from '@/types/errors';
import { ExpenseProps, ExpensesFilter } from '@/types/expense';
import { fetchExpenses } from '@/services/expenses';

type UseFetchExpenses = [
	ExpenseProps[],
	boolean,
	ApiError | null,
	(filter?: ExpensesFilter) => void
];

export const useFetchExpenses = (): UseFetchExpenses => {
	const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load(filter = ExpensesFilter.Today) {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchExpenses(filter);
			setExpenses(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [expenses, loading, error, load];
}
