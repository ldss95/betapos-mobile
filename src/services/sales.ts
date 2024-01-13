import http from '@/utils/http';

export async function fetchAccountsReceivableAmount() {
	const { data } = await http.get<{ amount: number; }>('/sales/accounts-receivable-amount');
	return data;
}
