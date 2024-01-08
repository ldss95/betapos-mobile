import { memo } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { RenderIf } from '@/components';
import { useBiometric } from '@/hooks/useBiometric';

const BiometricAuthButton = () => {
	const [hasBiometric, biometric, loading, token] = useBiometric();

	if (!hasBiometric || !token) {
		return <></>;
	}

	return (
		<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
		</TouchableOpacity>
	)
}

export default memo(BiometricAuthButton);