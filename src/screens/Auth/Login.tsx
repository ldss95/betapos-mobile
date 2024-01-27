import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

import { useLogin } from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { Button, Input, ScreenContainer } from '@/components';
import BiometricAuthButton from './components/BiometricAuthButton';
import { RootStackScreenProps } from '@/types/routes';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
	const [login, loading, error] = useLogin();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	useErrorHandling(error);

	useEffect(() => {
		AsyncStorage
			.getItem('last_user_email')
			.then((email) => email && setEmail(email));
	}, []);

	function startLogin() {
		if (email === '') {
			return showAlert({
				type: 'warning',
				title: 'Ingrese su correo electronico',
				description: ''
			});
		}

		if (password === '') {
			return showAlert({
				type: 'warning',
				title: 'Ingrese su contraseña',
				description: ''
			});
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
