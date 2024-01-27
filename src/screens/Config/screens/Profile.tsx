import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';

import {
	Button,
	Select,
	Input,
	ScreenContainer,
	DatePicker,
	Avatar,
	ScreenHeader
} from '@/components';
import { useSessionStore } from '@/store/session';
import { UpdateProfileParams } from '@/types/user';
import { useUpdateProfile } from '@/hooks/useUsers';
import { showAlert } from '@/components/Alert';
import useErrorHandling from '@/hooks/useError';

export default function ProfileScreen() {
	const session = useSessionStore(({ session }) => session);
	const [updateProfile, loading, error] = useUpdateProfile();
	const [modifiedUserData, setModifiedUserData] = useState<UpdateProfileParams>({
		id: ''
	});
	useErrorHandling(error);

	async function changeProfilePhoto() {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (!granted) {
			return;
		}

		const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			quality: 0.5,
			mediaTypes: ImagePicker.MediaTypeOptions.Images
		});

		if (canceled) {
			return;
		}

		const [{ base64, uri }] = assets;
		if (!base64) {
			return;
		}

		const extension = uri.split('.').pop();
		setModifiedUserData({
			...modifiedUserData,
			photo: {
				base64,
				type: `image/${extension}`,
				name: `${session?.id}-${dayjs().format('YYYY-MM-DD_HH:mm:ss')}.${extension}`
			}
		})
	}

	function afterUpdate() {
		showAlert({
			title: 'Genial!',
			type: 'success',
			description: 'Tu perfil ha sido actualizado.'
		});
	}

	return (
		<ScreenContainer>
			<ScreenHeader title='Perfil' />
			<View style={styles.photoContainer}>
				<Avatar
					url={(modifiedUserData.photo)
						? `data:image/jpeg;base64,${modifiedUserData.photo.base64}`
						: session?.photoUrl!
					}
					placeholderLabel={session?.firstName?.charAt(0) + ' ' + session?.lastName?.charAt(0)}
					size={150}
					onPressChangeButton={changeProfilePhoto}
					showChangeButton
				/>
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
				onDone={([gender]) => setModifiedUserData({
					...modifiedUserData,
					gender: gender as 'F' | 'M' | 'O'
				})}
			/>
			<Button
				type='primary'
				loading={loading}
				onPress={() => {
					updateProfile(
						{ ...modifiedUserData, id: session?.id! },
						afterUpdate
					);
				}}
			>
				Guardar
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	photoContainer: {
		position: 'relative',
		alignItems: 'center'
	}
});
