import { Text, View } from 'react-native';

import { BackButton, Button, Input, ScreenContainer } from '@/components';

export default function ResetPasswordScreen() {
	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<BackButton />
				<Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Nueva Contraseña</Text>
				<Text style={{ color: '#FFFFFF80', fontSize: 14, fontWeight: '400' }}>
					Tu identidad ha sido verificada, ahora puedes cambiar tu contraseña.
				</Text>

				<Input label='Nueva contraseña' />
				<Input label='Confirmar nueva contraseña' />
			</View>

			<Button type='primary'>
				Guardar contraseña
			</Button>
		</ScreenContainer>
	)
}