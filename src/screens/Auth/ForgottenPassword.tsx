import { Text, View, StyleSheet } from 'react-native';

import { BackButton, Button, Input, ScreenContainer } from '@/components';
import { RootStackScreenProps } from '@/types/routes';

export default function ForgotPasswordScreen({ navigation }: RootStackScreenProps<'ForgotPassword'>) {
	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<BackButton />
				<Text style={styles.title}>Olvidaste tu contraseña?</Text>
				<Text style={styles.description}>
					No te preocupes!{'\n'}
					Te enviaremos un  correo electrónico con un código de verificación, una vez verificada tu identidad con dicho código podrás cambiar tu contraseña.
				</Text>
				
				<Input label='Correo Electrónico' />
			</View>

			<Button
				type='primary'
				onPress={() => navigation.navigate('VerifyResetPasswordCode')}
			>
				Enviar Código
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	title: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10
	},
	description: {
		color: '#FFFFFF80',
		fontSize: 14,
		fontWeight: '400'
	}
});
