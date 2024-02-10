import { memo, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Image, ImageSource } from 'expo-image';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { format } from '@/utils/helpers';
import { RenderIf } from '@/components';

interface ShiftTotalSoldProps {
	totalSold: number;
	soldByCard: number;
	soldByCash: number;
	soldByCredit: number;
	loading?: boolean;
}

const ShiftTotalSold = (props: ShiftTotalSoldProps) => {
	const [selectedAmountKey, setSelectedAmountKey] = useState<keyof Omit<ShiftTotalSoldProps, 'loading'>>('totalSold');
	const { amount, title } = useMemo(() => {
		const titles = {
			totalSold: 'Total vendido',
			soldByCard: 'Vendido en tarjeta',
			soldByCash: 'Vendido en efectivo',
			soldByCredit: 'Vendido a credito',
		};

		return {
			title: titles[selectedAmountKey],
			amount: props[selectedAmountKey]
		};
	}, [props, selectedAmountKey]);

	return (
		<View style={styles.container}>
			<View style={styles.amountContainer}>
				<Text style={styles.amountTitle}>{title}</Text>
				<RenderIf condition={!!props.loading && selectedAmountKey !== 'totalSold'}>
					<ActivityIndicator size='large' style={{ marginVertical: 6 }} color='#FFF' />
				</RenderIf>
				<RenderIf condition={!props.loading || selectedAmountKey === 'totalSold'}>
					<Text style={styles.amount}>${format.cash(amount, 2)}</Text>
				</RenderIf>
			</View>
			<View style={styles.optionsContainer}>
				<Option
					icon={require('@/assets/icons/coin.png')}
					text='Todo'
					onPress={() => setSelectedAmountKey('totalSold')}
					selected={selectedAmountKey === 'totalSold'}
				/>
				<Option
					icon={require('@/assets/icons/moneys.png')}
					text='Efectivo'
					onPress={() => setSelectedAmountKey('soldByCash')}
					selected={selectedAmountKey === 'soldByCash'}
				/>
				<Option
					icon={require('@/assets/icons/card-pos.png')}
					text='Tarjeta'
					onPress={() => setSelectedAmountKey('soldByCard')}
					selected={selectedAmountKey === 'soldByCard'}
				/>
				<Option
					icon={require('@/assets/icons/clock.png')}
					text='Fiao'
					onPress={() => setSelectedAmountKey('soldByCredit')}
					selected={selectedAmountKey === 'soldByCredit'}
				/>
			</View>
		</View>
	);
}

interface OptionProps {
	text: string;
	icon: ImageSource;
	selected?: boolean;
	onPress?: () => void;
}

const Option = ({ text, icon, onPress, selected }: OptionProps) => (
	<TouchableOpacity
		style={styles.optionContainer}
		onPress={onPress}
	>
		<View style={[styles.optionCircle, { ...selected && { backgroundColor: Colors.ColorSecondary } }]}>
			<Image
				style={{ width: 24, height: 24 }}
				source={icon}
			/>
		</View>
		<Text style={styles.optionText}>{text}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderMd
	},
	amountContainer: {
		backgroundColor: Colors.ColorPrimary,
		padding: 20,
		borderRadius: Space.BorderMd,
		gap: 10
	},
	amountTitle: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '300',
		fontSize: 18
	},
	amount: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 40
	},
	optionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20
	},
	optionContainer: {
		alignItems: 'center'
	},
	optionCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#292929',
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionText: {
		marginTop: 5,
		color: '#FFF'
	}
});

export default memo(ShiftTotalSold);
