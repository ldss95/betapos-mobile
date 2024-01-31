import { z } from 'zod';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button, Input, ScreenContainer, ScreenHeader } from '@/components';
import { RootStackScreenProps } from '@/types/routes';
import { useRequestResetPasswordEmail } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';
import dayjs from 'dayjs';

export default function ForgotPasswordScreen({ navigation }: RootStackScreenProps<'ForgotPassword'>) {
	const [email, setEmail] = useState('');
	const [request, loading, error] = useRequestResetPasswordEmail();
	useErrorHandling(error);

	function onPressSend() {
		if (email.replace(/ /g, '').length === 0) {
			return;
		}

		const validation = z.string().email().safeParse(email);
		if (!validation.success) {
			return showAlert({
				title: 'Email inválido',
				description: 'Verifica el correo ingresado',
				type: 'warning'
			});
		}

		request(
			email,
			() => navigation.navigate('VerifyResetPasswordCode', {
				email,
				sentAt: dayjs()
			})
		);
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<ScreenHeader title='Olvidaste tu contraseña?' />
				<Text style={styles.description}>
					Te enviaremos un  correo electrónico con un código de verificación, una vez verificada tu identidad con dicho código podrás cambiar tu contraseña.
				</Text>

				<Input
					label='Correo Electrónico'
					keyboardType='email-address'
					autoCapitalize='none'
					onChangeText={setEmail}
				/>
			</View>

			<Button
				type='primary'
				onPress={onPressSend}
				loading={loading}
			>
				Enviar Código
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	description: {
		color: '#FFFFFF80',
		fontSize: 14,
		fontWeight: '400'
	}
});
