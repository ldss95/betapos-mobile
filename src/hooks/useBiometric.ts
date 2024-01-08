import { useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthenticationType } from 'expo-local-authentication';
import * as Sentry from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseBiometricType = [
	boolean,
	{
		name: string;
		icon: ImageSourcePropType;
	} | null,
	boolean,
	string | null
]

export const useBiometric = (useWhite?: boolean): UseBiometricType => {
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [type, setType] = useState<AuthenticationType[]>([]);
	const [hasBiometric, setHasBiometric] = useState(false);
	const biometric = useMemo(() => {
		if (type.length === 0) {
			return null;
		}

		if (Platform.OS === 'ios' && type.includes(AuthenticationType.FACIAL_RECOGNITION)) {
			return {
				name: 'Face ID',
				icon: useWhite ? require('@/assets/icons/face-id-white.png') : require('@/assets/icons/face-id.png')
			};
		}

		if (Platform.OS === 'android' && type.includes(AuthenticationType.FACIAL_RECOGNITION)) {
			return {
				name: 'Reconocimiento facial',
				icon: useWhite ? require('@/assets/icons/face-unlock-white.png') : require('@/assets/icons/face-unlock.png')
			};
		}

		if (Platform.OS === 'ios' && type.includes(AuthenticationType.FINGERPRINT)) {
			return {
				name: 'Touch ID',
				icon: useWhite ? require('@/assets/icons/touch-id-white.png') : require('@/assets/icons/touch-id.png')
			};
		}

		if (Platform.OS === 'android' && type.includes(AuthenticationType.FINGERPRINT)) {
			return {
				name: 'Huella dactilar',
				icon: useWhite ? require('@/assets/icons/fingerprint-white.png') : require('@/assets/icons/fingerprint.png')
			};
		}

		return null;
	}, [type]);

	useEffect(() => {
		setLoading(true);
		Promise
			.all([
				LocalAuthentication.hasHardwareAsync(),
				LocalAuthentication.isEnrolledAsync(),
				LocalAuthentication.supportedAuthenticationTypesAsync(),
				AsyncStorage.getItem('biometric_auth_token')
			])
			.then(([hasHardware, isEnrolled, supportedTypes, token]) => {
				setHasBiometric(hasHardware && isEnrolled);
				setType(supportedTypes);
				setToken(token);
			})
			.catch(Sentry.captureException)
			.finally(() => setLoading(false));
	}, []);

	return [hasBiometric, biometric, loading, token];
}