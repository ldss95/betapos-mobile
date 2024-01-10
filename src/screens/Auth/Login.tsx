import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useLogin } from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { Button, Input, ScreenContainer } from '@/components';
import BiometricAuthButton from './components/BiometricAuthButton';
import { RootStackScreenProps } from '@/types/routes';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
	const [login, loading, error] = useLogin();
	const [email, setEmail] = useState(__DEV__ ? 'lsantiago@betapos.com.do' : '');
	const [password, setPassword] = useState(__DEV__ ? '123456' : '');

	useEffect(() => {
		if (error) {
			alert(error.response?.data.message);
		}
	}, [error]);

	function startLogin() {
		if (email === '') {
			return alert('Ingrese su correo electronico');
		}

		if (password === '') {
			return alert('Ingrese su correo electronico');
		}

		login(
			email,
			password,
			() => navigation.reset({
				index: 0,
				routes: [{ name: 'Root' }]
			})
		);
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<Text style={styles.title}>Bienvenido</Text>

			<Image source={require('@/assets/icons/key-square.png')} style={styles.icon} />

			<View style={{ width: '100%', gap: 15 }}>
				<Input
					label='Correo Electrónico'
					placeholder='jdoe@gmail.com'
					autoCapitalize='none'
					keyboardType='email-address'
					onChangeText={setEmail}
					value={email}
				/>

				<Input
					label='Contraseña'
					placeholder='************'
					autoCapitalize='none'
					onChangeText={setPassword}
					value={password}
					secureTextEntry
				/>

				<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
					<Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
				</TouchableOpacity>
			</View>

			<BiometricAuthButton />

			<Button onPress={startLogin} loading={loading} type='primary'>
				Iniciar Sesión
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center'
	},
	icon: {
		width: 64,
		height: 64,
		alignSelf: 'center'
	},
	forgotPassword: {
		color: Colors.ColorSecondary,
		fontSize: 14,
		textAlign: 'right'
	}
});