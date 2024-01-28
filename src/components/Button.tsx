import { memo } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	ActivityIndicator,
	ImageSourcePropType
} from 'react-native';
import { Image } from 'expo-image';

import RenderIf from './RenderIf';
import Space from '@/constants/Space';
import Colors from '@/constants/Colors';

interface ButtonProps {
	onPress?: () => void;
	children: string;
	loading?: boolean;
	small?: boolean;
	medium?: boolean;
	auto?: boolean;
	style?: 'rounded' | 'squared',
	type?: 'primary' | 'secondary' | 'error'
	icon?: ImageSourcePropType;
	borderColor?: string;
	disabled?: boolean;
}

const Button = ({ onPress, children, loading, small, style = 'squared', type, icon, medium, borderColor, auto, disabled }: ButtonProps) => {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					...auto && { flex: 1 },
					...small && styles.small,
					...medium && styles.medium,
					...style === 'rounded' && styles.rounded,
					...style === 'squared' && styles.squared,
					...type === 'primary' && styles.primary,
					...type === 'secondary' && styles.secondary,
					...type === 'error' && styles.error,
					...borderColor && { borderColor },
					...disabled && styles.disabled
				}
			]}
			disabled={disabled}
			onPress={onPress}
		>
			<RenderIf condition={!!icon}>
				<Image source={icon!} style={{ width: 24, height: 24 }} />
			</RenderIf>
			<RenderIf condition={!!loading}>
				<ActivityIndicator color='#fff' />
			</RenderIf>
			<Text
				style={[
					styles.text,
					{
						...(small && {
							fontSize: 12,
							fontWeight: '300'
						}),
						...(medium && {
							fontSize: 16,
							fontWeight: 'normal'
						})
					}
				]}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		width: '100%',
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.BgCard
	},
	disabled: {
		opacity: 0.3,
		backgroundColor: 'grey',
		borderWidth: 0
	},
	small: {
		paddingHorizontal: 15,
		height: 33,
		width: 'auto'
	},
	medium: {
		paddingHorizontal: 15,
		height: 41,
		width: 'auto'
	},
	rounded: {
		borderRadius: Space.BorderMd
	},
	squared: {
		borderRadius: Space.BorderSm
	},
	primary: {
		backgroundColor: Colors.ColorPrimary,
		borderWidth: 0
	},
	secondary: {
		backgroundColor: Colors.ColorSecondary,
		borderWidth: 0
	},
	error: {
		backgroundColor: '#C32A2A',
		borderWidth: 0
	},
	text: {
		color: '#fff',
		fontWeight:'bold',
		fontSize: 18,
		textAlign: 'center'
	}
})

export default memo(Button);
