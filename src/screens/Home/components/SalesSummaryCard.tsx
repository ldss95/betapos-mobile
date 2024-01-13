import { memo, useMemo } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';
import { format } from '@/utils/helpers';
import Skeleton from '@/components/Skeleton';

interface SalesSummaryCardProps {
	amount: number;
	diff: number;
	loading: boolean;
}

const SalesSummaryCard = ({ amount, loading, diff }: SalesSummaryCardProps) => {
	return (
		<View style={styles.container}>
			<Skeleton active={loading} />

			<View style={styles.header}>
				<View style={styles.headerTitleContainer}>
					<Image
						source={require('@/assets/icons/receipt-item.png')}
						style={styles.headerIcon}
					/>
					<Text style={styles.headerTitle}>Ventas</Text>
				</View>

				<View style={styles.comparisonContainer}>
					<Text style={styles.comparisonText}>{diff > 0 ? '+' : ''}{Math.round(diff)}%</Text>
				</View>
			</View>

			<Text style={styles.total}>$ {format.cash(amount, 2)}</Text>

			<Image
				source={require('@/assets/images/statistic-line.png')}
				style={styles.statisticLine}
			/>
			<View style={styles.statisticLineBase} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderMd,
		width: '100%',
		padding: Space.Padding,
		overflow: 'hidden',
		position: 'relative'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	headerTitle: {
		color: '#fff',
		fontSize: 14
	},
	headerIcon: {
		width: 24,
		height: 24
	},
	comparisonContainer: {
		backgroundColor: Colors.ColorSecondary,
		borderRadius: Space.BorderSm,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	comparisonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 14
	},
	total: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#fff',
		marginTop: 20
	},
	statisticLine: {
		width: '100%',
		marginTop: -35,
		zIndex: -1
	},
	statisticLineBase: {
		width: '100%',
		height: 1,
		backgroundColor: '#303030',
		marginTop: -20
	}
})

export default memo(SalesSummaryCard);
