import { useEffect, useState } from 'react';

import { ApiError } from '@/types/errors';
import { ProviderProps } from '@/types/provider';
import { fetchProviders } from '@/services/providers';

type UseFetchProvidersType = [
	ProviderProps[],
	boolean,
	ApiError | null
];

export const useFetchProviders = (): UseFetchProvidersType => {
	const [providers, setProviders] = useState<ProviderProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		try {
			setLoading(true);
			const data = await fetchProviders();
			setProviders(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [providers, loading, error];
}
