import { Text } from 'react-native';

import { BackButton, Input, ScreenContainer } from '@/components';

export default function ChangePasswordScreen() {
	return (
		<ScreenContainer>
			<BackButton />
			<Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Nueva Contraseña</Text>

			<Input label='Contraseña Actual' />
			<Input label='Nueva contraseña' />
			<Input label='Confirmar nueva contraseña' />
		</ScreenContainer>
	)
}