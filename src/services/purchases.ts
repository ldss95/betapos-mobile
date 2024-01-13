import http from '@/utils/http';

export async function fetchPurchasesPendingToPayAmount() {
	const { data } = await http.get<{ amount: number; }>('/purchases/pending-to-pay-amount');
	return data;
}
