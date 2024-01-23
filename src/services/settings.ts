import { SettingsProps } from '@/types/settings';
import http from '@/utils/http';

export async function fetchSettings() {
	const { data } = await http.get<SettingsProps>('/settings');
	return data;
}

export async function updateSettings(params: { [key: string]: any }) {
	await http.put('/settings', params);
}
