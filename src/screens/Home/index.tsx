import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { Image } from 'expo-image';

import SalesSummaryCard from './components/SalesSummaryCard';
import MicroData from './components/MicroData';
import ShiftSummary from './components/ShiftSummary';
import { RenderIf, ScreenContainer } from '@/components';
import { useFetchShifts } from '@/hooks/useShifts';
import { useSalesSummary } from '@/hooks/useSalesSummary';
import { useFetchPurchasesPendingToPayAmount } from '@/hooks/usePurchases';
import { useFetchAccountsReceivableAmount } from '@/hooks/useSales';
import { useEffect } from 'react';

export default function HomeScreen() {
	const [data, loadingSummary] = useSalesSummary();
	const [shifts, loadingShifts, errorShifts, reloadShifts] = useFetchShifts();
	const [pendingToPay, loadingPTP, errorPTP, reloadPTP] = useFetchPurchasesPendingToPayAmount();
	const [accountsReceivable, loadingAR, errorAR, reloadAR] = useFetchAccountsReceivableAmount();

	useEffect(() => {
		reloadAR(false);
		reloadPTP(false);
		reloadShifts(false);
	}, [data]);

	return (
		<ScreenContainer hasBottomTabs>
			<SalesSummaryCard
				amount={data?.salesAmount || 0}
				diff={data?.percentDiff || 0}
				loading={loadingSummary}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
				<MicroData
					icon={require('@/assets/icons/status-up.png')}
					value={data?.profitsAmount || 0}
					label='Ganancias'
					loading={loadingSummary}
				/>

				<MicroData
					icon={require('@/assets/icons/money-recive.png')}
					value={accountsReceivable}
					label='Por Cobrar'
					loading={loadingAR}
				/>

				<MicroData
					icon={require('@/assets/icons/wallet.png')}
					value={pendingToPay}
					label='Por Pagar'
					loading={loadingPTP}
				/>
			</View>

			<RenderIf condition={shifts.length > 0 || loadingShifts}>
				<Text style={{ color: '#FFFFFF80', fontSize: 18 }}>Resumen por turno</Text>
			</RenderIf>

			<RenderIf condition={shifts.length === 0 && !loadingShifts}>
				<Text style={{ color: '#FFF', fontSize: 18, textAlign: 'center', marginVertical: 30 }}>Aun no se ha iniciado ningun turno hoy</Text>
				<Image source={require('@/assets/icons/clock.png')} style={{ width: 80, height: 80, alignSelf: 'center' }} />
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
