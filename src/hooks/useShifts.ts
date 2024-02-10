import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { ApiError } from '@/types/errors';
import { ShiftProps, ShiftSoldDetailsProps } from '@/types/shift';
import { fetchShiftSoldDetails, fetchShifts } from '@/services/shifts';

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

type UseFetchShiftDetailsType = [
	ShiftSoldDetailsProps[],
	boolean,
	ApiError | null
];

export const useFetchShiftDetails = (id: string): UseFetchShiftDetailsType => {
	const [data, setData] = useState<ShiftSoldDetailsProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load(id);
	}, [id]);

	async function load(id: string) {
		try {
			setIsLoading(true);
			setError(null);
			const data = await fetchShiftSoldDetails(id);
			setData(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setIsLoading(false);
		}
	}

	return [data, isLoading, error];
}
