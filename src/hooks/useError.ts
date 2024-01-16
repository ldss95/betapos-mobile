import { useEffect } from 'react';

import { ApiError } from '@/types/errors';
import { extractTitleAndDescriptionFromErrorMessage } from '@/utils/helpers';
import { showAlert } from '@/components/Alert';

const useErrorHandling = (error: ApiError | null, defaultUnknownErrorMessage?: string) => {
	useEffect(() => {
		if (error) {
			if (error?.response?.data?.errors) {
				const [{ message }] = error?.response?.data?.errors;
				const [title, description] = extractTitleAndDescriptionFromErrorMessage(message);
				showAlert({
					title,
					description,
					type: 'warning'
				});
				return;
			}

			if (error?.response?.data?.message) {
				showAlert({
					title: error?.response?.data?.title ?? 'Error Desconocido',
					description: error?.response?.data?.message,
					type: 'warning'
				});
				return;
			}

			showAlert({
				title: 'Error Desconocido',
				description: defaultUnknownErrorMessage || 'No pudimos procesar tu solicitud, por favor inténtelo más tarde',
				type: 'error'
			});
		}
	}, [error]);
};

export default useErrorHandling;
