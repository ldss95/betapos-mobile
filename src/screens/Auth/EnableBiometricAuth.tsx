import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

import { Button, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import { useBiometric } from '@/hooks/useBiometric';
import { RootStackScreenProps } from '@/types/routes';
import { useToggleBiometricAuth } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
const { width } = Dimensions.get('screen');

export default function EnableBiometricAuth({ navigation }: RootStackScreenProps<'EnableBiometricAuth'>) {
	const [_, biometric] = useBiometric(true);
	const [enableBiometric, loading, error] = useToggleBiometricAuth();
	useErrorHandling(error);

	async function onPressOmit() {
		await AsyncStorage.setItem('enable_biometric_auth_was_shown', 'true');
		navigation.reset({
			index: 0,
			routes: [{ name: 'Root' }]
		});
	}

	function onPressEnable() {
		enableBiometric(biometric?.type!, async () => {
			await AsyncStorage.setItem('enable_biometric_auth_was_shown', 'true');
			navigation.reset({
				index: 0,
				routes: [{ name: 'Root' }]
			});
		});
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<Text style={styles.title}>Puedes activar tu {biometric?.name}</Text>

			<View style={{ gap: 20 }}>
				<View style={styles.circle1}>
					<View style={styles.circle2}>
						<View style={styles.circle3}>
							<View style={styles.circle4}>
								<Image source={biometric?.icon} style={styles.biometricIcon} />
							</View>
						</View>
					</View>
				</View>

				<Text style={{ color: '#FFF', textAlign: 'center', fontSize: 18 }}>
					Ahorra tiempo la proxima vez que debas iniciar sesion utilizando tu {biometric?.name}.
				</Text>
			</View>

			<View style={{ flexDirection: 'row', gap: 20 }}>
				<Button auto onPress={onPressOmit}>
					Omitir
				</Button>

				<Button
					type='primary'
					onPress={onPressEnable}
					loading={loading}
					auto
				>
					{`Activar ${biometric?.name}`}
				</Button>
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	title: {
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 24
	},
	circle1: {
		width: width * 0.8,
		height: width * 0.8,
		borderWidth: 0.5,
		borderColor: Colors.ColorPrimary,
		borderRadius: width * 0.4,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	circle2: {
		width: width * 0.7,
		height: width * 0.7,
		borderWidth: 1,
		borderColor: Colors.ColorPrimary,
		borderRadius: width * 0.35,
		justifyContent: 'center',
		alignItems: 'center'
	},
	circle3: {
		width: width * 0.6,
		height: width * 0.6,
		borderWidth: 2,
		borderColor: Colors.ColorPrimary,
		borderRadius: width * 0.3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	circle4: {
		width: width * 0.5,
		height: width * 0.5,
		backgroundColor: Colors.ColorPrimary,
		borderRadius: width * 0.25,
		shadowColor: Colors.ColorPrimary,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 1,
		shadowRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	biometricIcon: {
		width: width * 0.2,
		height: width * 0.2
	}
});
