import { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { ScreenContainer, Skeleton } from '@/components';
import ExpenseCard from './components/ExpenseCard';
import { RootTabScreenProps } from '@/types/routes';
import { useFetchExpenses } from '@/hooks/useExpenses';
import useErrorHandling from '@/hooks/useError';
import { format } from '@/utils/helpers';
import { ExpensesPeriodFilter } from './components/PeriodFilter';
import { ExpensesFilter } from '@/types/expense';

const CardDescription = {
	[ExpensesFilter.Today]: 'Gastado de hoy',
	[ExpensesFilter.ThisWeek]: 'Gastado de la semana',
	[ExpensesFilter.ThisMonth]: 'Gastado del mes',
}

export default function ExpensesScreen({ navigation }: RootTabScreenProps<'Expenses'>) {
	const [selectedFilter, setSelectedFilter] = useState<ExpensesFilter>(ExpensesFilter.Today);
	const [search, setSearch] = useState('');
	const [expenses, loading, error, reload] = useFetchExpenses();
	const totalAmount = useMemo(() => {
		if (expenses.length === 0) {
			return 0;
		}

		return expenses.reduce((total, { amount }) => total + amount, 0);
	}, [expenses]);
	const filteredExpenses = useMemo(() => {
		if (expenses.length === 0) {
			return [];
		}

		if (search === '') {
			return expenses;
		}

		return expenses.filter(({ description, docNumber, category }) => (
			description.toLowerCase().includes(search.toLowerCase()) ||
			docNumber?.toLowerCase()?.includes(search.toLowerCase()) ||
			category.name.toLowerCase().includes(search.toLowerCase())
		))
	}, [search, expenses]);
	useErrorHandling(error);

	return (
		<ScreenContainer hasBottomTabs>
			<View style={{ flexDirection: 'row', gap: 20 }}>
				<View style={{ position: 'relative', flex: 1 }}>
					<Image
						source={require('@/assets/icons/search.png')}
						style={styles.searchInputIcon}
					/>
					<TextInput
						placeholder='Buscar'
						placeholderTextColor='#FFFFFF80'
						style={styles.searchInput}
						onChangeText={setSearch}
					/>
				</View>

				<TouchableOpacity
					style={styles.newExpenseButton}
					onPress={() => navigation.navigate('SaveExpense')}
				>
					<Image
						source={require('@/assets/icons/add-circle.png')}
						style={{ width: 36, height: 36 }}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.summaryCardContainer}>
				<Skeleton active={loading} />

				<Text style={styles.summaryCardValue}>$ {format.cash(totalAmount)}</Text>
				<Text style={styles.summaryCardLabel}>{CardDescription[selectedFilter]}</Text>
			</View>

			<ExpensesPeriodFilter
				onChange={(filter) => {
					reload(filter);
					setSelectedFilter(filter);
				}}
			/>

			<Text style={styles.listTitle}>Historial</Text>

			<View style={{ gap: 20 }}>
				{filteredExpenses.map(({ id, amount, description, category, date }) => (
					<ExpenseCard
						key={id}
						time={dayjs(date).format('DD[\n]MMM')}
						category={category.name}
						description={description}
						amount={amount}
					/>
				))}
			</View>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center'
	},
	searchInput: {
		height: 60,
		borderWidth: 1,
		borderColor: Colors.BgCard,
		borderRadius: Space.BorderMd,
		fontSize: 14,
		color: '#FFF',
		paddingLeft: 64,
		paddingRight: 20
	},
	searchInputIcon: {
		width: 24,
		height: 24,
		position: 'absolute',
		left: 20,
		top: 18
	},
	summaryCardContainer: {
		width: '100%',
		borderRadius: Space.BorderMd,
		padding: 20,
		gap: 10,
		backgroundColor: Colors.BgCard,
		overflow: 'hidden'
	},
	summaryCardValue: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#FFF',
		textAlign: 'center'
	},
	summaryCardLabel: {
		fontSize: 18,
		color: '#FFFFFF80',
		textAlign: 'center'
	},
	newExpenseButton: {
		backgroundColor: Colors.ColorPrimary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		width: 60,
		borderRadius: Space.BorderMd
	},
	listTitle: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#FFF'
	}
});
