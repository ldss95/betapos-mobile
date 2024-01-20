import {
	TouchableOpacity,
	Image,
	Text,
	View,
	Dimensions,
	StyleSheet,
	ImageSourcePropType,
	ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { BackButton, RenderIf, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { RootStackScreenProps } from '@/types/routes';
import { useBiometric } from '@/hooks/useBiometric';
import { useToggleBiometricAuth } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';
import { useDeleteMyAccount } from '@/hooks/useUsers';

const {  width } = Dimensions.get('screen');
const ItemSize = (width - 60) / 2;

export default function SecurityAndPasswordScreen({ navigation }: RootStackScreenProps<'SecurityAndPassword'>) {
	const [hasBiometric, biometric, _, token, reload] = useBiometric(true);
	const [toggleBiometricAuth, loading, error] = useToggleBiometricAuth();
	const [deleteAccount, deleting, deleteError] = useDeleteMyAccount();
	useErrorHandling(error || deleteError);

	function handleDeleteAccount() {
		showAlert({
			type: 'warning',
			title: 'Advertencia!',
			description: (
				<Text style={{ color: '#FFF' }}>
					Si presionas <Text style={{ fontWeight: 'bold' }}>Eliminar!</Text>, tu cuenta y sus datos serán eliminado permanentemente, esta acción no se puede revertir.
				</Text>
			),
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
			showCancelButton: true,
			showConfirmButton: true,
			onConfirm: () => deleteAccount(() => navigation.reset({
				index: 0,
				routes: [{ name: 'Login' }]
			}))
		});
	}

	return (
		<ScreenContainer>
			<BackButton />

			<View style={styles.container}>
				<Item
					title={'Cambiar\nContraseña'}
					icon={require('@/assets/icons/password-check.png')}
					onPress={() => navigation.navigate('ChangePassword')}
				/>
				<RenderIf condition={hasBiometric}>
					<Item
						title={`${token ? 'Desactivar': 'Activar'} ${biometric?.name}`}
						description='Inicia sesión mas fácil y rápido'
						icon={biometric?.icon!}
						onPress={() => toggleBiometricAuth(biometric?.type!, reload)}
						loading={loading}
					/>
				</RenderIf>
				<Item
					title='Eliminar Cuenta'
					description='Esta acción es permanente'
					icon={require('@/assets/icons/danger.png')}
					onPress={handleDeleteAccount}
					loading={deleting}
					danger
				/>
			</View>
		</ScreenContainer>
	)
}

interface ItemProps {
	title: string;
	description?: string;
	icon: ImageSourcePropType;
	danger?: boolean;
	loading?: boolean;
	onPress?: () => void;
}

const Item = ({ title, description, icon, danger, onPress, loading }: ItemProps) => (
	<TouchableOpacity
		style={[
			styles.itemContainer,
			{
				...danger && {
					borderWidth: 2,
					borderColor: '#C32A2A'
				}
			}
		]}
		onPress={onPress}
	>
		<RenderIf condition={!!loading}>
			<BlurView intensity={15} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
				<ActivityIndicator color='#FFF' size='large' />
			</BlurView>
		</RenderIf>

		<Image
			source={icon}
			style={{ height: 56, width: 56 }}
		/>

		<View>
			<Text
				style={[styles.itemTitle, { ...danger && { color: '#C32A2A' } }]}
			>
				{title}
			</Text>
			<RenderIf condition={!!description}>
				<Text style={styles.itemDescription}>{description}</Text>
			</RenderIf>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 20
	},
	itemContainer: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		width: ItemSize,
		height: ItemSize,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 30,
		overflow: 'hidden'
	},
	itemTitle: {
		color: '#FFF',
		fontSize: 14,
		textAlign: 'center'
	},
	itemDescription: {
		color: '#B0B0B0',
		fontSize: 10,
		textAlign: 'center',
		fontWeight:'400'
	}
});
