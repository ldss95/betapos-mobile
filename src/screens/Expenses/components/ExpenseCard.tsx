import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { format } from '@/utils/helpers';

interface ExpenseCardProps {
	time: string;
	category: string;
	description: string;
	amount: number;
}

const ExpenseCard = ({ time, category, description, amount }: ExpenseCardProps) => (
	<View style={styles.container}>
		<View style={styles.descriptionContainer}>
			<Text style={styles.time}>{time}</Text>
			<View style={styles.divider} />
			<View>
				<Text style={styles.category}>{category}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
		<Text style={styles.amount}>
			$ {format.cash(amount)}
		</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	descriptionContainer: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center'
	},
	time: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 14
	},
	divider: {
		height: 30,
		width: 1,
		backgroundColor: '#FFFFFF65'
	},
	category: {
		color: '#FFF',
		fontSize: 10,
		fontWeight: '300'
	},
	description: {
		color: '#FFF',
		fontSize: 14
	},
	amount: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 14
	}
});

export default memo(ExpenseCard);
