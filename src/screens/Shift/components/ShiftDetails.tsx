import { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image, ImageSource } from 'expo-image';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';

interface ShiftDetailsProps {
	userName: string;
	date: string;
	startTime: string;
	startAmount: string;
	incomesAmount: string;
	expensesAmount: string;
	endAmount: string;
	endTime: string;
}

const ShiftDetails = (props: ShiftDetailsProps) => {
	const {
		userName,
		date,
		startTime,
		startAmount,
		incomesAmount,
		expensesAmount,
		endAmount,
		endTime
	} = props;

	return (
		<View style={styles.container}>
			<Item
				value={userName}
				title='Usuario'
				icon={require('@/assets/icons/profile-circle.png')}
			/>
			<Item
				value={date}
				title='Fecha'
				icon={require('@/assets/icons/calendar.png')}
			/>
			<Item
				value={startTime}
				title='Hora de inicio'
				icon={require('@/assets/icons/clock.png')}
			/>
			<Item
				value={startAmount}
				title='Efectivo al inicio'
				icon={require('@/assets/icons/coins.png')}
			/>
			<Item
				value={incomesAmount}
				title='Ingresos'
				icon={require('@/assets/icons/money-recive.png')}
			/>
			<Item
				value={expensesAmount}
				title='Egresos'
				icon={require('@/assets/icons/money-send.png')}
			/>
			<Item
				value={endAmount}
				title='Efectivo al cierre'
				icon={require('@/assets/icons/coins.png')}
			/>
			<Item
				value={endTime}
				title='Hora de cierre'
				icon={require('@/assets/icons/clock.png')}
			/>
		</View>
	)
}

interface ItemProps {
	title: string;
	icon: ImageSource;
	value: string;
}

const Item = ({ title, icon, value }: ItemProps) => (
	<View style={styles.itemContainer}>
		<View style={styles.itemIconAndTitleContainer}>
			<Image style={styles.icon} source={icon} />
			<Text style={{ color: '#FFF' }}>{title}</Text>
		</View>
		<Text style={{ color: '#FFF' }}>{value}</Text>
	</View>
)

const styles = StyleSheet.create({
	container: {
		borderRadius: Space.BorderMd,
		borderWidth: 1,
		borderColor: Colors.BgCard,
		padding: 10,
		gap: 10
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	itemIconAndTitleContainer: {
		gap: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		width: 32,
		height: 32
	}
});

export default memo(ShiftDetails);

