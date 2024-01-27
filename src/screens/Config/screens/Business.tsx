import { useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';

import { Avatar, Button, Input, ScreenContainer, ScreenHeader } from '@/components';
import { useSessionStore } from '@/store/session';
import Colors from '@/constants/Colors';
import { UpdateBusinessParams } from '@/types/business';
import { useUpdateBusiness } from '@/hooks/useBusiness';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';

const { width } = Dimensions.get('screen');

export default function BusinessScreen() {
	const { session, setSession } = useSessionStore(({ session, setSession }) => ({
		session,
		setSession
	}));
	const [updateBusiness, loading, error] = useUpdateBusiness();
	useErrorHandling(error);
	const [modifiedBusinessData, setModifiedBusinessData] = useState<UpdateBusinessParams>({
		id: ''
	});

	async function changeBusinessLogo() {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
		console.log(base64.substring(0, 100))

		const extension = uri.split('.').pop();
		setModifiedBusinessData({
			...modifiedBusinessData,
			logo: {
				base64,
				type: `image/${extension}`,
				name: `${session?.id}-${dayjs().format('YYYY-MM-DD_HH:mm:ss')}.${extension}`
			}
		})
	}

	function afterUpdate() {
		setSession({
			...session!,
			business: {
				...session?.business!,
				...modifiedBusinessData
			}
		});
		showAlert({
			title: 'Genial!',
			type: 'success',
			description: 'Tu negocio ha sido actualizado.'
		});
	}

	return (
		<ScreenContainer>
			<ScreenHeader title='Mi Negocio' />
			<View style={styles.logoContainer}>
				<Avatar
					size={150}
					url={(modifiedBusinessData.logo)
						? `data:image/jpeg;base64,${modifiedBusinessData.logo.base64}`
						: session?.business?.logoUrl
					}
					showChangeButton
					onPressChangeButton={changeBusinessLogo}
					placeholderLabel={
						(session?.business?.name || '')
							.split(' ')
							.map(item => item.charAt(0))
							.join('')
					}
				/>
			</View>
			<Text style={styles.merchantId}>@{session?.merchantId}</Text>

			<Input
				label='Nombre'
				defaultValue={session?.business?.name}
				onChangeText={(name) => setModifiedBusinessData({ ...modifiedBusinessData, name })}
			/>

			<Input
				label='RNC'
				defaultValue={session?.business?.rnc}
				onChangeText={(rnc) => setModifiedBusinessData({ ...modifiedBusinessData, rnc })}
			/>

			<Input
				label='Correo Electrónico'
				defaultValue={session?.business?.email}
				onChangeText={(email) => setModifiedBusinessData({ ...modifiedBusinessData, email })}
			/>

			<Input
				label='Dirección'
				defaultValue={session?.business?.address}
				onChangeText={(address) => setModifiedBusinessData({ ...modifiedBusinessData, address })}
			/>

			<Input
				label='Teléfono'
				defaultValue={session?.business?.phone}
				onChangeText={(phone) => setModifiedBusinessData({ ...modifiedBusinessData, phone })}
			/>

			<Button
				type='primary'
				loading={loading}
				onPress={() => {
					updateBusiness(
						{ ...modifiedBusinessData, id: session?.businessId! },
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
