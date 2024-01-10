import { useState } from 'react';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login, logout } from '@/services/auth';
import { useSessionStore } from '@/store/session';

type UseLoginType = [
	(email: string, password: string, onDone?: () => void) => void,
	boolean,
	AxiosError<{ message: string }> | null
];

export const useLogin = (): UseLoginType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);
	const setSession = useSessionStore(({ setSession }) => setSession);

	async function handleLogin(email: string, password: string, onDone?: () => void) {
		try {
			setLoading(true);
			const { user, token } = await login(email, password);
			setSession(user);
			await AsyncStorage.setItem('token', token);
			onDone && onDone();
		} catch (error) {
			setError(error as AxiosError<{ message: string }>);
		} finally {
			setLoading(false);
		}
	}

	return [handleLogin, loading, error];
}

type UseLogoutType = [
	(onDone?: () => void) => void,
	boolean,
	AxiosError<{ message: string }> | null
];

export const useLogout = (): UseLogoutType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);
	const setSession = useSessionStore(({ setSession }) => setSession);

	async function handleLogout(onDone?: () => void) {
		try {
			setLoading(true);
			await logout();
			setSession(null);
			onDone && onDone();
		} catch (error) {
			setError(error as AxiosError<{ message: string }>);
		} finally {
			setLoading(false);
		}
	}

	return [handleLogout, loading, error];
}