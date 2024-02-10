import { useMemo } from 'react';
import dayjs from 'dayjs';

import ShiftResultIndicator from './components/ShiftResultIndicator';
import { ScreenContainer, ScreenHeader } from '@/components';
import ShiftTotalSold from './components/ShiftTotalSold';
import { useFetchShiftDetails } from '@/hooks/useShifts';
import { useFetchCashFlow } from '@/hooks/useCashFlow';
import { RootStackScreenProps } from '@/types/routes';
import ShiftDetails from './components/ShiftDetails';
import useErrorHandling from '@/hooks/useError';
import { format } from '@/utils/helpers';

export default function ShiftScreen({ route }: RootStackScreenProps<'Shift'>) {
	const { data } = route.params;
	const [details, loading, error] = useFetchShiftDetails(data.id);
	const [cashFlow, loadingCashFlow, errorCashFlow] = useFetchCashFlow(data.id);
	useErrorHandling(error || errorCashFlow);

	const difference = useMemo(() => {
		if (!data.endTime || !data.endAmount) {
			return null;
		}

		return data.endAmount - (data.startAmount + data.cashFlow + data.totalSoldCash);
	}, [data]);

	return (
		<ScreenContainer>
			<ScreenHeader title='Resumen de turno' />

			<ShiftTotalSold
				totalSold={data.totalSold}
				soldByCard={details.find(({ name }) => name === 'Tarjeta')?.total || 0}
				soldByCash={details.find(({ name }) => name === 'Efectivo')?.total || 0}
				soldByCredit={details.find(({ name }) => name === 'Fiao')?.total || 0}
				loading={loading}
			/>

			<ShiftDetails
				userName={data.user.firstName + ' ' + data.user.lastName}
				date={dayjs(data.date).format('DD MMM YYYY')}
				startTime={dayjs(data.date + ' ' + data.startTime).format('hh:mm A')}
				startAmount={format.cash(data.startAmount, 2)}
				incomesAmount={
					loadingCashFlow ? '...' :
					format.cash(
						cashFlow
							.filter(({ type }) => type === 'IN')
							.reduce((total, { amount }) => total + amount, 0),
						2
					)
				}
				expensesAmount={
					loadingCashFlow ? '...' :
					format.cash(
						cashFlow
							.filter(({ type }) => type === 'OUT')
							.reduce((total, { amount }) => total + amount, 0),
						2
					)
				}
				endAmount={data.endAmount ? format.cash(data.endAmount, 2) : 'N/A'}
				endTime={data.endTime ? dayjs(data.date + ' ' + data.endTime).format('hh:mm A') : 'N/A'}
			/>


			<ShiftResultIndicator result={difference} />
		</ScreenContainer>
	);
}


