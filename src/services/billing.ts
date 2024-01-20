import { BillProps } from '@/types/bill';
import http from '@/utils/http';

export async function fetchAllBills() {
	const { data } = await http.get<BillProps[]>('/billing');
	return data;
}
