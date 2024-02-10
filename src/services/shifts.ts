import { ShiftProps, ShiftSoldDetailsProps } from '@/types/shift';
import http from '@/utils/http';

export async function fetchShifts(date: string) {
	const { data } = await http.get<{ data: ShiftProps[]; count: number; }>('/shifts', {
		params: {
			date
		}
	});

	return data
}

export async function fetchShiftSoldDetails(id: string): Promise<ShiftSoldDetailsProps[]> {
	const { data } = await http.get<ShiftSoldDetailsProps[]>('/shifts/sold-details/' + id);
	return data;
}
