import { memo, useEffect, useState } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { Skeleton } from '@/components';

interface NotificationConfigItemProps {
	title: string;
	description: string;
	value: boolean;
	loading?: boolean;
	onChange: (value: boolean) => void;
}

const NotificationConfigItem = ({ title, description, value: defaultValue, onChange, loading = false }: NotificationConfigItemProps) => {
	const [value, setValue] = useState(defaultValue || false);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<View style={styles.container}>
			<Skeleton active={loading} />

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
		justifyContent: 'space-between',
		overflow: 'hidden'
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
