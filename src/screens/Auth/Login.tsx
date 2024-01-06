import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogin } from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { Button, Input } from '@/components';
import BiometricAuthButton from './components/BiometricAuthButton';
import { RootStackScreenProps } from '@/types/routes';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
	const edges = useSafeAreaInsets();
	const [login, loading, error] = useLogin();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.BgPrimary
			}}
		>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20, paddingBottom: edges.bottom }}
				contentContainerStyle={{ justifyContent: 'space-between', height: '100%', alignItems: 'center' }}
			>
				<Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Bienvenido</Text>

				<Image source={require('@/assets/icons/key-square.png')} style={{ width: 64, height: 64 }} />

				<View style={{ width: '100%', gap: 15 }}>
					<Input
						label='Correo Electrónico'
						placeholder='jdoe@gmail.com'
						autoCapitalize='none'
						keyboardType='email-address'
						onChangeText={setEmail}
					/>

					<Input
						label='Contraseña'
						placeholder='************'
						autoCapitalize='none'
						onChangeText={setPassword}
						secureTextEntry
					/>

					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={{ color: Colors.ColorSecondary, fontSize: 14, textAlign: 'right' }}>¿Olvidaste tu contraseña?</Text>
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