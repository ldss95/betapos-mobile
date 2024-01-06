import { memo, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, Text, Platform, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthenticationType } from 'expo-local-authentication';

import Colors from '@/constants/Colors';
import { RenderIf } from '@/components';

const BiometricAuthButton = () => {
	const [hasBiometric, setHasBiometric] = useState(false);
	const [type, setType] = useState<AuthenticationType[]>([]);
	const { name, icon } = useMemo(() => {
		const _default = { name: '', icon: null };
		if (type.length === 0) {
			return _default;
		}

		if (Platform.OS === 'ios' && type.includes(AuthenticationType.FACIAL_RECOGNITION)) {
			return {
				name: 'Face ID',
				icon: require('@/assets/icons/face-id.png')
			};
		}

		if (Platform.OS === 'android' && type.includes(AuthenticationType.FACIAL_RECOGNITION)) {
			return {
				name: 'Reconocimiento facial',
				icon: require('@/assets/icons/face-unlock.png')
			};
		}

		if (Platform.OS === 'ios' && type.includes(AuthenticationType.FINGERPRINT)) {
			return {
				name: 'Touch ID',
				icon: require('@/assets/icons/touch-id.png')
			};
		}

		if (Platform.OS === 'android' && type.includes(AuthenticationType.FINGERPRINT)) {
			return {
				name: 'Huella dactilar',
				icon: require('@/assets/icons/fingerprint.png')
			};
		}

		return _default;
	}, [type]);

	useEffect(() => {
		LocalAuthentication
			.hasHardwareAsync()
			.then(setHasBiometric);

		LocalAuthentication
			.supportedAuthenticationTypesAsync()
			.then(setType)
	}, []);

	if (!hasBiometric) {
		return <></>;
	}

	return (
		<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
			<RenderIf condition={!!icon}>
				<Image source={icon} style={{ width: 16, height: 16 }} />
			</RenderIf>
			<Text
				style={{
					color: Colors.ColorSecondary,
					fontSize: 14
				}}
			>
				Ingresar con {name}
			</Text>
		</TouchableOpacity>
	)
}

export default memo(BiometricAuthButton);