import { memo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import Colors from '@/constants/Colors';
import { RenderIf } from '@/components';
import { useBiometric } from '@/hooks/useBiometric';
import { useLoginBiometric } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';

const BiometricAuthButton = () => {
	const navigation = useNavigation();
	const [hasBiometric, biometric, _, token] = useBiometric();
	const [login, loading, error] = useLoginBiometric();
	useErrorHandling(error);

	if (!hasBiometric || !token) {
		return <></>;
	}

	return (
		<TouchableOpacity
			style={{ flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'center', padding: 10 }}
			onPress={() => login(token, () => {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Root' }]
				})
			})}
		>
			<RenderIf condition={!!biometric}>
				<Image source={biometric?.icon!} style={{ width: 16, height: 16 }} />
			</RenderIf>
			<Text
				style={{
					color: Colors.ColorSecondary,
					fontSize: 14
				}}
			>
				Ingresar con {biometric?.name}
			</Text>
			<RenderIf condition={loading}>
				<ActivityIndicator color={Colors.ColorSecondary} />
			</RenderIf>
		</TouchableOpacity>
	)
}

export default memo(BiometricAuthButton);
