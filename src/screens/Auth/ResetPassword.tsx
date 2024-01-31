import { Text, View } from 'react-native';

import { Button, Input, ScreenContainer, ScreenHeader } from '@/components';

export default function ResetPasswordScreen() {
	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<ScreenHeader title='Nueva Contraseña' />
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
