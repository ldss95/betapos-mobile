import { useEffect, useState } from 'react';

import { fetchAllCashFlowByShift } from '@/services/cash-flow';
import { CashFlowProps } from '@/types/cash-flow';
import { ApiError } from '@/types/errors';

type UseFetchCashFlowType = [
	CashFlowProps[],
	boolean,
	ApiError | null
];

export const useFetchCashFlow = (shiftId: string): UseFetchCashFlowType => {
	const [cashFlow, setCashFlow] = useState<CashFlowProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load(shiftId);
	}, [shiftId]);

	async function load(shiftId: string) {
		try {
			setIsLoading(true);
			setError(null);
			const data = await fetchAllCashFlowByShift(shiftId);
			setCashFlow(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setIsLoading(false);
		}
	}

	return [cashFlow, isLoading, error];
}
