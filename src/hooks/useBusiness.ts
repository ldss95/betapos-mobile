import { useState } from 'react';

import { updateBusiness } from '@/services/business';
import { UpdateBusinessParams } from '@/types/business';
import { ApiError } from '@/types/errors';

type UseUpdateBusinessType = [
	(
		params: UpdateBusinessParams,
		onDone?: () => void
	) => void,
	boolean,
	ApiError | null
];

export const useUpdateBusiness = (): UseUpdateBusinessType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	async function handleUpdate(params: UpdateBusinessParams, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			await updateBusiness(params);
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [handleUpdate, loading, error];
}
