import { SessionProps } from '@/types/auth';
import http from '@/utils/http';

export async function login(email: string, password: string) {
	const { data } = await http.post<{ user: SessionProps; token: string; }>('/auth/login', {
		email,
		password
	});

	return data;
}

export async function logout() {
	await http.post('/auth/logout');
}

export async function changePassword(oldPassword: string, newPassword: string) {
	await http.post('/auth/change-password', {
		oldPassword,
		newPassword
	});
}
