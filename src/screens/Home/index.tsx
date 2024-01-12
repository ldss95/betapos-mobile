import { View, Text, ActivityIndicator } from 'react-native';

import SalesSummaryCard from './components/SalesSummaryCard';
import MicroData from './components/MicroData';
import ShiftSummary from './components/ShiftSummary';
import { RenderIf, ScreenContainer } from '@/components';
import { useFetchShifts } from '@/hooks/useShifts';
import { useSalesSummary } from '@/hooks/useSalesSummary';

export default function HomeScreen() {
	const [shifts, loadingShifts, error, reload] = useFetchShifts();
	const [data, loadingSummary] = useSalesSummary();

	return (
		<ScreenContainer hasBottomTabs>
			<SalesSummaryCard
				amount={data?.salesAmount || 0}
				loading={loadingSummary}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
				<MicroData
					icon={require('@/assets/icons/status-up.png')}
					value={data?.profitsAmount || 0}
					label='Ganancias'
				/>

				<MicroData
					icon={require('@/assets/icons/money-recive.png')}
					value={32650}
					label='Por Cobrar'
				/>

				<MicroData
					icon={require('@/assets/icons/wallet.png')}
					value={86400}
					label='Por Pagar'
				/>
			</View>
			<Text style={{ color: '#FFFFFF80', fontSize: 18 }}>Resumen por turno</Text>

			<RenderIf condition={loadingShifts}>
				<ActivityIndicator color='#FFF' />
			</RenderIf>
			
			<View style={{ gap: 20 }}>
				<RenderIf condition={shifts.length === 0 && loadingShifts}>
					<ShiftSummary
						startedAt='08:00:00'
						amount={0}
						seller={{ name: 'Fulano' }}
						loading
					/>

					<ShiftSummary
						startedAt='08:00:00'
						amount={0}
						seller={{ name: 'Fulano' }}
						loading
					/>

					<ShiftSummary
						startedAt='08:00:00'
						amount={0}
						seller={{ name: 'Fulano' }}
						loading
					/>
				</RenderIf>
				{shifts
					.map(({ id, startTime, totalSold, user }) => (
						<ShiftSummary
							key={id}
							startedAt={startTime}
							amount={totalSold}
							seller={{
								name: `${user.firstName} ${user.lastName}`,
								photoUrl: user.photoUrl
							}}
						/>
					))
				}
			</View>
		</ScreenContainer>
	)
}
