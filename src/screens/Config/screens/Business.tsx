import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { BackButton, Button, Input, ScreenContainer } from '@/components';
import { useSessionStore } from '@/store/session';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('screen');

export default function BusinessScreen() {
	const session = useSessionStore(({ session }) => session);

	async function openLibrary() {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) {
			return;
		}

		await ImagePicker.launchImageLibraryAsync();
	}

	return (
		<ScreenContainer>
			<BackButton />
			<View style={styles.logoContainer}>
				<Image
					source={{ uri: 'https://cdn.dribbble.com/users/4213091/screenshots/14451394/media/69f34ada9e4286976aaeaf91f910ce45.png?resize=1600x1200&vertical=center' }}
					style={styles.logo}
				/>
				<TouchableOpacity style={styles.changeLogoButton} onPress={openLibrary}>
					<Image
						source={require('@/assets/icons/edit-image.png')}
						style={{ height: 24, width: 24 }}
					/>
				</TouchableOpacity>
			</View>
			<Text style={styles.merchantId}>@{session?.merchantId}</Text>

			<Input
				label='Nombre'
				defaultValue={session?.business?.name}
			/>

			<Input
				label='RNC'
				defaultValue={session?.business?.rnc}
			/>

			<Input
				label='Correo Electrónico'
				defaultValue={session?.business?.email}
			/>

			<Input
				label='Dirección'
				defaultValue={session?.business?.address}
			/>

			<Input
				label='Teléfono'
				defaultValue={session?.business?.phone}
			/>

			<Button type='primary'>
				Guardar
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	logoContainer: {
		position: 'relative',
		alignItems: 'center'
	},
	logo: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 1,
		borderColor: '#FFF'
	},
	changeLogoButton: {
		backgroundColor: '#FFF',
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: (width - 190) / 2, bottom: 20
	},
	merchantId: {
		color: Colors.ColorSecondary,
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center'
	},
});
