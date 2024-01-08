import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
	BackButton,
	Button,
	Input,
	RenderIf,
	ScreenContainer
} from '@/components';
import { useSessionStore } from '@/store/session';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('screen');

export default function ProfileScreen() {
	const session = useSessionStore(({ session }) => session);

	async function openCamera() {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (!granted) {
			return;
		}

		await ImagePicker.launchCameraAsync();
	}

	return (
		<ScreenContainer>
			<BackButton />
			<View style={styles.photoContainer}>
				<RenderIf condition={!!session?.photoUrl}>
					<Image
						source={{ uri: session?.photoUrl! }}
						style={styles.photo}
					/>
				</RenderIf>

				<RenderIf condition={!session?.photoUrl}>
					<View style={[styles.photo, { opacity: 0.6 }]}>
						<Text style={{ fontWeight: 'bold', fontSize: 48, color: '#FFF' }}>
							{session?.firstName?.charAt(0)}
							{session?.lastName?.charAt(0)}
						</Text>
					</View>
				</RenderIf>
				<TouchableOpacity style={styles.changeLogoButton} onPress={openCamera}>
					<Image
						source={require('@/assets/icons/edit-image.png')}
						style={{ height: 24, width: 24 }}
					/>
				</TouchableOpacity>
			</View>

			<Input
				label='Nombres'
			/>

			<Input
				label='Apellidos'
			/>

			<Input
				label='Correo Electrónico'
			/>

			<Input
				label='Nombre de Usuario'
			/>

			<Input
				label='Fecha de Nacimiento'
			/>

			<Input
				label='Genero'
			/>
			
			<Button type='primary'>
				Guardar
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	photoContainer: {
		position: 'relative',
		alignItems: 'center'
	},
	photo: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 1,
		borderColor: '#FFF',
		backgroundColor: Colors.ColorSecondary,
		justifyContent: 'center',
		alignItems: 'center'
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
	}
});