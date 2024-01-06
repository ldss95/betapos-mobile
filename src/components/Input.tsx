import { memo, useState } from 'react';
import {
	TextInputProps,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';

import RenderIf from './RenderIf';
import Space from '@/constants/Space';
import Colors from '@/constants/Colors';

interface InputProps extends TextInputProps {
	label: string;
	placeholder?: string;
}

const Input = ({ label, placeholder, secureTextEntry, ...props }: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View>
			<Text style={styles.label}>
				{label}
			</Text>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor='#6F6F6F'
				secureTextEntry={secureTextEntry && !showPassword}
				{...props }
			/>
			<RenderIf condition={!!secureTextEntry}>
				<TouchableOpacity
					onPress={() => setShowPassword(!showPassword)}
					style={styles.passwordVisibilityToggler}
				>
					<Image
						source={
							showPassword
								? require('@/assets/icons/eye-slash.png')
								: require('@/assets/icons/eye.png')
						}
						style={{ width: 24, height: 24 }}
					/>
				</TouchableOpacity>
			</RenderIf>
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.8)',
		marginLeft: 12,
		marginBottom: 12
	},
	input: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		height: 60,
		paddingHorizontal: 20,
		fontSize: 18,
		color: '#fff'
	},
	passwordVisibilityToggler: {
		height: 60,
		width: 60,
		position: 'absolute',
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default memo(Input);