import { useEffect, useState } from 'react';

import { fetchSettings, updateSettings } from '@/services/settings';
import { ApiError } from '@/types/errors';
import { SettingsProps } from '@/types/settings';

type UseFetchSettingsType = [
	SettingsProps | null,
	boolean,
	ApiError | null
];

export const useFetchSettings = (): UseFetchSettingsType => {
	const [settings, setSettings] = useState<SettingsProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchSettings();
			setSettings(data);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [settings, loading, error];
}

type UseUpdateSettingsType = [
	(prams: { [key: string]: any }, onDone?: () => void) => void,
	boolean,
	ApiError | null
];

export const useUpdateSettings = (): UseUpdateSettingsType => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	async function handleUpdate(params: { [key: string]: any }, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			await updateSettings(params);
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [handleUpdate, loading, error];
}

