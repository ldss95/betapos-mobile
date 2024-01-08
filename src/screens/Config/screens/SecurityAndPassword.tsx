import { TouchableOpacity, Image, Text, View, Dimensions, StyleSheet, ImageSourcePropType } from 'react-native';

import { BackButton, RenderIf, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { RootStackScreenProps } from '@/types/routes';

const {  width } = Dimensions.get('screen');
const ItemSize = (width - 60) / 2;

export default function SecurityAndPasswordScreen({ navigation }: RootStackScreenProps<'SecurityAndPassword'>) {
	return (
		<ScreenContainer>
			<BackButton />

			<View style={styles.container}>
				<Item
					title={'Cambiar\nContraseña'}
					icon={require('@/assets/icons/password-check.png')}
					onPress={() => navigation.navigate('ChangePassword')}
				/>
				<Item
					title='Activar Huella'
					description='Inicia sesión mas fácil y rápido'
					icon={require('@/assets/icons/finger-scan.png')}
				/>
				<Item
					title='Eliminar Cuenta'
					description='Esta acción es permanente'
					icon={require('@/assets/icons/danger.png')}
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
	onPress?: () => void;
}

const Item = ({ title, description, icon, danger, onPress }: ItemProps) => (
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
		paddingVertical: 30
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