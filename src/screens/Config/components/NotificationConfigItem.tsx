import { memo, useState } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';

interface NotificationConfigItemProps {
	title: string;
	description: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

const NotificationConfigItem = ({ title, description, value: defaultValue, onChange }: NotificationConfigItemProps) => {
	const [value, setValue] = useState(defaultValue || false);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>

			<Switch
				value={value}
				onChange={({ nativeEvent }) => {
					setValue(nativeEvent.value);
					onChange(nativeEvent.value);
				}}
				ios_backgroundColor={Colors.BgCard}
				trackColor={{
					true: Colors.ColorPrimary,
					false: Colors.BgCard
				}}
				thumbColor='#FFF'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: Space.BorderSm,
		borderWidth: 1,
		borderColor: Colors.BgCard,
		paddingHorizontal: 15,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '700'
	},
	description: {
		color: '#FFFFFF80',
		fontSize: 12
	}
});

export default memo(NotificationConfigItem);