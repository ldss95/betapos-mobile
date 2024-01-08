import { memo } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	ActivityIndicator,
	ImageSourcePropType,
	Image
} from 'react-native';

import RenderIf from './RenderIf';
import Space from '@/constants/Space';
import Colors from '@/constants/Colors';

interface ButtonProps {
	onPress?: () => void;
	children: string;
	loading?: boolean;
	small?: boolean;
	medium?: boolean;
	style?: 'rounded' | 'squared',
	type?: 'primary' | 'secondary'
	icon?: ImageSourcePropType;
	borderColor?: string;
}

const Button = ({ onPress, children, loading, small, style = 'squared', type, icon, medium, borderColor }: ButtonProps) => {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					...small && styles.small,
					...medium && styles.medium,
					...style === 'rounded' && styles.rounded,
					...style === 'squared' && styles.squared,
					...type === 'primary' && styles.primary,
					...type === 'secondary' && styles.secondary,
					...borderColor && { borderColor }
				}
			]}
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
	text: {
		color: '#fff',
		fontWeight:'bold',
		fontSize: 18,
		textAlign: 'center'
	}
})

export default memo(Button);
