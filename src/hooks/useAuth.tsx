import { useState } from 'react';
import { Platform, Text } from 'react-native';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationType } from 'expo-local-authentication';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

import { changePassword, getAuthToken, login, loginBiometric, logout } from '@/services/auth';
import { useSessionStore } from '@/store/session';
import { BiometricAuthTokenType } from '@/types/auth';
import { ApiError } from '@/types/errors';
import { showAlert } from '@/components/Alert';

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
			await AsyncStorage.setItem('last_user_email', email);
			onDone && onDone();
		} catch (error) {
			setError(error as AxiosError<{ message: string }>);
		} finally {
			setLoading(false);
		}
	}

	return [handleLogin, loading, error];
}

type UseLoginBiometricType = [
	(token: string, onDone?: () => void) => void,
	boolean,
	AxiosError<{ message: string }> | null
];

export const useLoginBiometric = (): UseLoginBiometricType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);
	const setSession = useSessionStore(({ setSession }) => setSession);

	async function handleBiometricLogin(biometricToken: string, onDone?: () => void) {
		try {
			setLoading(true);
			const { success } = await LocalAuthentication.authenticateAsync();
			if (!success) {
				return;
			}
			const { user, token } = await loginBiometric(biometricToken);
			setSession(user);
			await AsyncStorage.setItem('token', token);
			onDone && onDone();
		} catch (error) {
			setError(error as AxiosError<{ message: string }>);
		} finally {
			setLoading(false);
		}
	}

	return [handleBiometricLogin, loading, error];
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

type UseChangePasswordType = [
	(oldPassword: string, newPassword: string, onDone?: () => void) => void,
	boolean,
	AxiosError<{ message: string }> | null
];

export const useChangePassword = (): UseChangePasswordType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);

	async function handleChangePassword(oldPassword: string, newPassword: string, onDone?: () => void) {
		try {
			setLoading(true);
			await changePassword(oldPassword, newPassword);
			onDone && onDone();
		} catch (error) {
			setError(error as AxiosError<{ message: string }>);
		} finally {
			setLoading(false);
		}
	}

	return [handleChangePassword, loading, error];
}

type UseToggleBiometricLoginType = [
	(
		localAuthType: LocalAuthentication.AuthenticationType,
		onDone?: () => void
	) => void,
	boolean,
	ApiError | null
];

const tokenTypes: any = {
	'ios': {
		[AuthenticationType.FACIAL_RECOGNITION]: BiometricAuthTokenType.FaceId,
		[AuthenticationType.FINGERPRINT]: BiometricAuthTokenType.TouchId
	},
	'android': {
		[AuthenticationType.FACIAL_RECOGNITION]: BiometricAuthTokenType.FaceUnlock,
		[AuthenticationType.FINGERPRINT]: BiometricAuthTokenType.Fingerprint
	}
}

const BiometricTypeName: any = {
	'ios': {
		[AuthenticationType.FACIAL_RECOGNITION]: 'Face ID',
		[AuthenticationType.FINGERPRINT]: 'Touch ID'
	},
	'android': {
		[AuthenticationType.FACIAL_RECOGNITION]: 'Reconocimiento Facial',
		[AuthenticationType.FINGERPRINT]: 'Huella Dactilar'
	}
}

export const useToggleBiometricAuth = (): UseToggleBiometricLoginType => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	async function toggleBiometricAuth(localAuthType: LocalAuthentication.AuthenticationType, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			const { success } = await LocalAuthentication.authenticateAsync();
			if (!success) {
				return;
			}

			const currentToken = await AsyncStorage.getItem('biometric_auth_token');
			if (currentToken) {
				await AsyncStorage.removeItem('biometric_auth_token');
				showAlert({
					title: 'Listo!',
					description: `${BiometricTypeName[Platform.OS][localAuthType]} desactivado`,
					type: 'success'
				});
				onDone && onDone();
				return;
			}

			const token = await getAuthToken(tokenTypes[Platform.OS][localAuthType]);
			await AsyncStorage.setItem('biometric_auth_token', token);
			await logout();
			showAlert({
				title: 'Genial!',
				description: (
					<Text style={{ color: '#FFF', textAlign: 'center' }}>
						Ya puedes iniciar sesion con {BiometricTypeName[Platform.OS][localAuthType]}
						{'\n'}
						<Text style={{ fontWeight: 'bold', color: '#FFF' }}>Pruebalo!</Text>
					</Text>
				),
				type: 'success'
			});
			navigation.reset({
				index: 0,
				routes: [{
					name: 'Login'
				}]
			});
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [toggleBiometricAuth, loading, error];
}
