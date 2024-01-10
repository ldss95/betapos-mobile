import { Text, View, StyleSheet, TextInput } from 'react-native';

import { BackButton, Button, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { RootStackScreenProps } from '@/types/routes';

export default function VerifyResetPasswordCodeScreen({ navigation }: RootStackScreenProps<'VerifyResetPasswordCode'>) {
	return (
		<ScreenContainer justifySpaceBetween>
			<View style={styles.container}>
				<BackButton />
				<Text style={styles.title}>Verifica tu identidad</Text>
				<Text style={styles.description}>
					Hemos enviado un código de verificación a tu correo tucorreo@correo.com, digítalo aquí para cambiar contraseña.
				</Text>
				
				<View style={styles.inputsContainer}>
					<TextInput style={styles.input} keyboardType='number-pad' />
					<TextInput style={styles.input} keyboardType='number-pad' />
					<TextInput style={styles.input} keyboardType='number-pad' />
					<TextInput style={styles.input} keyboardType='number-pad' />
				</View>

				<Text style={[styles.description, { textAlign: 'center' }]}>
					Este código expira en: 04:22
				</Text>
			</View>

			<Button type='primary' onPress={() => navigation.navigate('ResetPassword')}>
				Verificar Código
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		marginBottom: 200
	},
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
	},
	inputsContainer: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginVertical: 40
	},
	input: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		height: 60,
		width: 60,
		textAlign: 'center',
		fontSize: 24,
		color: '#FFF'
	}
});
