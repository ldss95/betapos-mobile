import { useEffect, useState } from 'react';

import { ApiError } from '@/types/errors';
import {
	ExpenseCategoryProps,
	ExpensePaymentMethodProps,
	ExpenseProps,
	ExpensesFilter,
	SaveExpenseParams
} from '@/types/expense';
import {
	fetchExpenses,
	fetchExpensesCategories,
	fetchExpensesPaymentMethods,
	saveExpense
} from '@/services/expenses';

type UseFetchExpensesType = [
	ExpenseProps[],
	boolean,
	ApiError | null,
	(filter?: ExpensesFilter) => void
];

export const useFetchExpenses = (): UseFetchExpensesType => {
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

type UseFetchExpensesPaymentMethodsType = [
	ExpensePaymentMethodProps[],
	boolean,
	ApiError | null
];

export const useFetchExpensesPaymentMethods = (): UseFetchExpensesPaymentMethodsType => {
	const [paymentMethods, setPaymentMethods] = useState<ExpensePaymentMethodProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchExpensesPaymentMethods();
			setPaymentMethods(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [paymentMethods, loading, error];
}

type UseFetchExpensesCategoriesType = [
	ExpenseCategoryProps[],
	boolean,
	ApiError | null
];

export const useFetchExpensesCategories = (): UseFetchExpensesCategoriesType => {
	const [categories, setCategories] = useState<ExpenseCategoryProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchExpensesCategories();
			setCategories(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [categories, loading, error];
}

type UseSaveExpenseType = [
	(data: SaveExpenseParams, onDone?: () => void) => void,
	boolean,
	ApiError | null
];

export const useSaveExpense = (): UseSaveExpenseType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	async function handleSave(data: SaveExpenseParams, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			await saveExpense(data);
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [handleSave, loading, error];
}
