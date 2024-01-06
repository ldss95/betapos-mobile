import { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import RenderIf from './RenderIf';

interface ButtonProps {
	onPress?: () => void;
	children: string;
	loading?: boolean;
}

const Button = ({ onPress, children, loading }: ButtonProps) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
		>
			<RenderIf condition={!!loading}>
				<ActivityIndicator color='#fff' />
			</RenderIf>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#50BD',
		borderRadius: 8,
		height: 60,
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#fff',
		fontWeight:'bold',
		fontSize: 18,
		textAlign: 'center'
	}
})

export default memo(Button);
