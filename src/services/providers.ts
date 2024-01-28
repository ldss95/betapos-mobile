import { ProviderProps } from '@/types/provider';
import http from '@/utils/http';

export async function fetchProviders() {
	const { data } = await http.get<ProviderProps[]>('/providers');
	return data;
}
