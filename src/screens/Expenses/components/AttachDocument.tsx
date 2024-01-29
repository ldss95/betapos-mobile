import { memo, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Image, ImageSource } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';
import { showAlert } from '@/components/Alert';
import { Button } from '@/components';

interface OnChangeParamsProps {
	photo: ImagePicker.ImagePickerAsset | null;
	document: DocumentPicker.DocumentPickerAsset | null;
}

interface AttachDocumentProps {
	onChange?: (params: OnChangeParamsProps) => void;
}

const AttachDocument = ({ onChange }: AttachDocumentProps) => {
	const ModalRef = useRef<Modalize>(null);
	const [visible, setVisible] = useState(false);
	const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
	const [document, setDocument] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

	useEffect(() => {
		if (visible) {
			Keyboard.dismiss();
			return ModalRef.current?.open();
		}

		ModalRef.current?.close();
	}, [visible]);

	useEffect(() => {
		onChange && onChange({ photo, document });
	}, [photo, document]);

	async function onPressTakePhoto() {
		const { granted, canAskAgain } = await ImagePicker.getCameraPermissionsAsync()
		if (!granted && !canAskAgain) {
			return showAlert({
				type: 'warning',
				title: 'Acceso negado',
				description: 'No podemos abrir tu cámara porque no nos diste permiso'
			})
		}

		if (!granted) {
			await ImagePicker.requestCameraPermissionsAsync();
			return onPressTakePhoto();
		}

		setVisible(false);
		const { canceled, assets } = await ImagePicker.launchCameraAsync({
			quality: 0.5,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: false,
			base64: true
		});

		if (canceled) {
			return;
		}

		setPhoto(assets[0]);
	}

	async function onPressOpenGallery() {
		const { granted, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
		if (!granted && !canAskAgain) {
			return showAlert({
				type: 'warning',
				title: 'Acceso negado',
				description: 'No podemos abrir tu libreria de imagenes porque no nos diste permiso'
			})
		}

		if (!granted) {
			await ImagePicker.requestMediaLibraryPermissionsAsync();
			return onPressOpenGallery();
		}

		setVisible(false);
		const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
			quality: 0.5,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: false,
			base64: true
		});

		if (canceled) {
			return;
		}

		setPhoto(assets[0]);
	}

	async function onPressChooseDocument() {
		setVisible(false);
		const { canceled, assets } = await DocumentPicker.getDocumentAsync({
			type: 'application/pdf',
		});

		if (canceled) {
			return;
		}

		setDocument(assets[0]);
	}

	if (photo) {
		return (
			<View style={[styles.container, { padding: 0 }]}>
				<Image
					style={styles.photoPreview}
					source={{
						uri: `data:image/jpeg;base64,${photo.base64}`
					}}
				/>

				<View style={{ position: 'absolute', bottom: 10, right: 10 }}>
					<Button
						small
						auto
						type='error'
						style='rounded'
						onPress={() => setPhoto(null)}
						icon={require('@/assets/icons/trash.png')}
					>
						Remover
					</Button>
				</View>
			</View>
		);
	}

	if (document) {
		return (
			<View style={[styles.container, {  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
				<Text style={{ color: '#FFF', flexWrap: 'wrap', flex: 1 }}>{document.name}</Text>

				<View>
					<Button
						small
						auto
						type='error'
						style='rounded'
						onPress={() => setDocument(null)}
						icon={require('@/assets/icons/trash.png')}
					>
						Remover
					</Button>
				</View>
			</View>
		);
	}

	return (
		<View>
			<TouchableOpacity
				style={styles.container}
				onPress={() => setVisible(true)}
			>
				<View style={styles.iconsContainer}>
					<Image
						source={require('@/assets/icons/camera.png')}
						style={{
							width: 24,
							height: 24,
							marginRight: -10
						}}
					/>

					<View style={styles.centralIconContainer}>
						<Image
							source={require('@/assets/icons/gallery.png')}
							style={{
								width: 32,
								height: 32
							}}
						/>
					</View>

					<Image
						source={require('@/assets/icons/folder.png')}
						style={{
							width: 24,
							height: 24,
							marginLeft: -10
						}}
					/>
				</View>
				<Text style={styles.title}>
					Adjuntar factura
				</Text>

				<Text style={styles.description}>
					Puedes cargar un documento PDF, elegir una foto de la galería o tomar una nueva foto con tu cámara.
				</Text>
			</TouchableOpacity>

			<Portal>
				<Modalize
					ref={ModalRef}
					modalHeight={150}
					modalStyle={{
						backgroundColor: Colors.BgCard,
						padding: 20
					}}
					onClose={() => setVisible(false)}
					scrollViewProps={{ showsVerticalScrollIndicator: false }}
				>
					<View style={{ flexDirection: 'row' }}>
						<Option
							label='Seleccionar PDF'
							icon={require('@/assets/icons/folder.png')}
							color='#9F5529'
							onPress={onPressChooseDocument}
						/>
						<Option
							label='Tomar Foto'
							icon={require('@/assets/icons/camera.png')}
							color='#423377'
							onPress={onPressTakePhoto}
						/>
						<Option
							label='Abrir Galería'
							icon={require('@/assets/icons/gallery.png')}
							color='#913699'
							onPress={onPressOpenGallery}
						/>
					</View>
				</Modalize>
			</Portal>
		</View>
	);
}

interface OptionProps {
	label: string;
	icon: ImageSource;
	color: string;
	onPress: () => void;
}

const Option = ({ label, icon, color, onPress }: OptionProps) => (
	<TouchableOpacity
		style={styles.optionContainer}
		onPress={onPress}
	>
		<View style={[styles.optionCircle, { backgroundColor: color }]}>
			<Image style={{ width: 40, height: 40 }} source={icon} />
		</View>
		<Text style={styles.optionText}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: 'grey',
		borderStyle: 'dashed',
		borderRadius: Space.BorderMd,
		backgroundColor: Colors.BgCard,
		padding: Space.Padding
	},
	iconsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
		alignItems: 'flex-end'
	},
	centralIconContainer: {
		backgroundColor: Colors.ColorSecondary,
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 24,
		zIndex: -1
	},
	title: {
		textAlign: 'center',
		color: '#FFF',
		marginBottom: 20,
		fontWeight: 'bold',
		fontSize: 16
	},
	description: {
		textAlign: 'center',
		color: '#FFF'
	},
	optionContainer: {
		flex: 1,
		gap: 10,
		alignItems: 'center'
	},
	optionCircle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionText: {
		color: '#FFF',
		textAlign: 'center'
	},
	photoPreview: {
		width: '100%',
		height: 188,
		resizeMode: 'cover',
		borderRadius: Space.BorderMd
	}
});

export default memo(AttachDocument);
