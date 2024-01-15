import { useState } from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';

import {
	BackButton,
	Button,
	Select,
	Input,
	RenderIf,
	ScreenContainer,
	DatePicker
} from '@/components';
import { useSessionStore } from '@/store/session';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('screen');

export default function ProfileScreen() {
	const session = useSessionStore(({ session }) => session);
	const [modifiedUserData, setModifiedUserData] = useState<{ [key: string]: any }>({});

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
				defaultValue={session?.firstName}
				autoCapitalize='words'
				onChangeText={(firstName) => setModifiedUserData({ ...modifiedUserData, firstName })}
			/>

			<Input
				label='Apellidos'
				defaultValue={session?.lastName}
				autoCapitalize='words'
				onChangeText={(lastName) => setModifiedUserData({ ...modifiedUserData, lastName })}
			/>

			<Input
				label='Correo Electrónico'
				defaultValue={session?.email}
				keyboardType='email-address'
				autoCapitalize='none'
				onChangeText={(email) => setModifiedUserData({ ...modifiedUserData, email })}
			/>

			<Input
				label='Nombre de Usuario'
				autoCapitalize='none'
				defaultValue={session?.nickName}
				onChangeText={(nickName) => setModifiedUserData({ ...modifiedUserData, nickName })}
			/>

			<DatePicker
				label='Fecha de Nacimiento'
				value={modifiedUserData?.birthDate || session?.birthDate}
				onChange={(birthDate) => setModifiedUserData({
					...modifiedUserData,
					birthDate
				})}
			/>

			<Select
				options={[
					{ label: 'Masculino', value: 'M' },
					{ label: 'Femenino', value: 'F' },
					{ label: 'Otro', value: 'O' }
				]}
				label='Genero'
				defaultValues={session?.gender ? [session.gender] : []}
				onDone={([gender]) => setModifiedUserData({ ...modifiedUserData, gender })}
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
