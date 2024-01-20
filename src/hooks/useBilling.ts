import { useEffect, useState } from 'react';

import { ApiError } from '@/types/errors';
import { BillProps } from '@/types/bill';
import { fetchAllBills } from '@/services/billing';

type UseFetchAllBillsType = [
	BillProps[],
	boolean,
	ApiError | null,
	() => void
];

export const useFetchAllBills = (): UseFetchAllBillsType => {
	const [bills, setBills] = useState<BillProps[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchAllBills();
			setBills(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [bills, loading, error, load];
}
