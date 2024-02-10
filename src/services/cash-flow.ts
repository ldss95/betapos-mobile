import { CashFlowProps } from '@/types/cash-flow';
import http from '@/utils/http';

export async function fetchAllCashFlowByShift(shiftId: string) {
	const { data } = await http.get<CashFlowProps[]>('/cash-flow', {
		params: {
			shiftId
		}
	});

	return data;
}
