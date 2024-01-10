import { View, Text } from 'react-native';

import SalesSummaryCard from './components/SalesSummaryCard';
import MicroData from './components/MicroData';
import ShiftSummary from './components/ShiftSummary';
import { ScreenContainer } from '@/components';
import { useFetchShifts } from '@/hooks/useShifts';

export default function HomeScreen() {
	const [shifts, loading, error, reload] = useFetchShifts();

	return (
		<ScreenContainer hasBottomTabs>
			<SalesSummaryCard />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
				<MicroData
					icon={require('@/assets/icons/status-up.png')}
					value={7209.45}
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
			
			<View style={{ gap: 20 }}>
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
