import { ShiftProps } from '@/types/shift';
import http from '@/utils/http';

export async function fetchShifts(date: string) {
	const { data } = await http.get<{ data: ShiftProps[]; count: number; }>('/shifts', {
		params: {
			date
		}
	});

	return data
}