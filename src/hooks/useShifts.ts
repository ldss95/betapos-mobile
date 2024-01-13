import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { ApiError } from '@/types/errors';
import { ShiftProps } from '@/types/shift';
import { fetchShifts } from '@/services/shifts';

type UseFetchShiftsType = [
	ShiftProps[],
	boolean,
	ApiError | null,
	(showLoading?: boolean) => void
]

export const useFetchShifts = (): UseFetchShiftsType => {
	const [shifts, setShifts] = useState<ShiftProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load(showLoading = true) {
		try {
			if (showLoading) {
				setLoading(true);
			}
			setError(null);
			const { data } = await fetchShifts(dayjs().format('YYYY-MM-DD'));
			setShifts(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [shifts, loading, error, load];
}
