import { memo, useMemo } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Colors from '@/constants/Colors';
import RenderIf from './RenderIf';

interface AvatarProps {
	size: number;
	url?: string;
	placeholderLabel: string;
	showChangeButton?: boolean;
	onPressChangeButton?: () => void;
}

const Avatar = ({ size, url, placeholderLabel, onPressChangeButton, showChangeButton }: AvatarProps) => {
	const sizeStyle = useMemo(() => {
		return {
			width: size,
			height: size,
			borderRadius: size / 2
		}
	}, [size]);

	if (url && url !== '') {
		return (
			<View>
				<Image
					source={{ uri: url }}
					style={[styles.photo, sizeStyle]}
				>

				</Image>
				<RenderIf condition={!!showChangeButton}>
					<TouchableOpacity
						style={styles.changeLogoButton}
						onPress={onPressChangeButton}
					>
						<Image
							source={require('@/assets/icons/edit-image.png')}
							style={{ height: 24, width: 24 }}
						/>
					</TouchableOpacity>
				</RenderIf>
			</View>
		)
	}

	return (
		<View style={[styles.photo, sizeStyle, { opacity: 0.6 }]}>
			<Text style={{ fontWeight: 'bold', fontSize: size / 2.5, color: '#FFF' }}>
				{placeholderLabel}
			</Text>

			<RenderIf condition={!!showChangeButton}>
				<TouchableOpacity
					style={styles.changeLogoButton}
					onPress={onPressChangeButton}
				>
					<Image
						source={require('@/assets/icons/edit-image.png')}
						style={{ height: 24, width: 24 }}
					/>
				</TouchableOpacity>
			</RenderIf>
		</View>
	);
}

const styles = StyleSheet.create({
	photo: {
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
		bottom: 20,
		right: 0
	}
});

export default memo(Avatar);
