import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogin } from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { Button, Input } from '@/components';
import BiometricAuthButton from './components/BiometricAuthButton';
import { RootStackScreenProps } from '@/types/routes';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
	const edges = useSafeAreaInsets();
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
		<View style={styles.container}>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20, paddingBottom: edges.bottom }}
				contentContainerStyle={styles.body}
			>
				<Text style={styles.title}>Bienvenido</Text>

				<Image source={require('@/assets/icons/key-square.png')} style={{ width: 64, height: 64 }} />

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

					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
					</TouchableOpacity>
				</View>

				<BiometricAuthButton />

				<Button onPress={startLogin} loading={loading}>
					Iniciar Sesión
				</Button>
			</ScrollView>
		</View>

	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BgPrimary
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center'
	},
	body: {
		justifyContent: 'space-between',
		height: '100%',
		alignItems: 'center'
	},
	forgotPassword: {
		color: Colors.ColorSecondary,
		fontSize: 14,
		textAlign: 'right'
	}
});