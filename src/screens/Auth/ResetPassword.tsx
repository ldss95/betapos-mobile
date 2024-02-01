import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button, Input, ScreenContainer, ScreenHeader } from '@/components';
import { RootStackScreenProps } from '@/types/routes';
import { useChangePasswordWithOTP } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';

export default function ResetPasswordScreen({ navigation, route }: RootStackScreenProps<'ResetPassword'>) {
	const { email, code } = route.params;
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [changePassword, loading, error] = useChangePasswordWithOTP();
	useErrorHandling(error);

	function onPressSave() {
		if (password === '' || password2 === '' || loading){
			return;
		}

		if (password !== password2) {
			return showAlert({
				title: 'Oops!',
				description: 'Las contraseñas no coinciden, intentalo otra vez.',
				type: 'warning'
			});
		}

		changePassword({ email, code, password }, () => {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'Login'
				}]
			});
		});
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<ScreenHeader title='Nueva Contraseña' />
				<Text style={{ color: '#FFFFFF80', fontSize: 14, fontWeight: '400' }}>
					Tu identidad ha sido verificada, ahora puedes cambiar tu contraseña.
				</Text>

				<Input
					label='Nueva contraseña'
					autoCapitalize='none'
					onChangeText={setPassword}
					secureTextEntry
				/>
				<Input
					label='Confirmar nueva contraseña'
					autoCapitalize='none'
					onChangeText={setPassword2}
					secureTextEntry
				/>
			</View>

			<Button
				type='primary'
				loading={loading}
				onPress={onPressSave}
			>
				Guardar contraseña
			</Button>
		</ScreenContainer>
	)
}
