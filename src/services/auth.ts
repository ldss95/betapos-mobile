import { BiometricAuthTokenType, CodeValidationResponse, SessionProps } from '@/types/auth';
import http from '@/utils/http';

export async function login(email: string, password: string) {
	const { data } = await http.post<{ user: SessionProps; token: string; }>('/auth/login', {
		email,
		password
	});

	return data;
}

export async function loginBiometric(token: string) {
	const { data } = await http.post<{ user: SessionProps; token: string; }>('/auth/login-biometric', {
		token
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

export async function getAuthToken(type: BiometricAuthTokenType) {
	const { data } = await http.post<string>(`/auth/generate-biometric-token/${type}`);
	return data;
}

export async function requestResetPasswordEmail(email: string) {
	await http.post(`/auth/request-reset-password-email-otp/${email}`);
}

export async function verifyResetPasswordCode(email: string, code: string) {
	const { data } = await http.post<CodeValidationResponse>('/auth/validate-reset-password-email-otp', {
		email,
		code
	});

	return data;
}

export async function changePasswordWithOTP(email: string, password: string, code: string) {
	await http.post('/auth/change-password-with-otp', {
		email,
		password,
		code
	});
}
