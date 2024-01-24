import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components';
import { ExpensesFilter } from '@/types/expense';

interface ExpensesPeriodFilterProps {
	onChange: (filter: ExpensesFilter) => void;
}

export const ExpensesPeriodFilter = ({ onChange }: ExpensesPeriodFilterProps) => {
	const [selectedFilter, setSelectedFilter] = useState<ExpensesFilter | null>(null);

	useEffect(() => {
		selectedFilter && onChange(selectedFilter);
	}, [selectedFilter]);

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
			<Button
				small
				style='rounded'
				type={selectedFilter === null || selectedFilter === ExpensesFilter.Today ? 'secondary' : undefined}
				onPress={() => setSelectedFilter(ExpensesFilter.Today)}
			>
				Hoy
			</Button>
			<Button
				small
				style='rounded'
				type={selectedFilter === ExpensesFilter.ThisWeek ? 'secondary' : undefined}
				onPress={() => setSelectedFilter(ExpensesFilter.ThisWeek)}
			>
				Esta semana
			</Button>
			<Button
				small
				style='rounded'
				type={selectedFilter === ExpensesFilter.ThisMonth ? 'secondary' : undefined}
				onPress={() => setSelectedFilter(ExpensesFilter.ThisMonth)}
			>
				Este mes
			</Button>
		</View>
	)
}
