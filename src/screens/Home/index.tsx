import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import SalesSummaryCard from './components/SalesSummaryCard';
import MicroData from './components/MicroData';
import ShiftSummary from './components/ShiftSummary';

export default function HomeScreen() {
	const edges = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20 }}
				contentContainerStyle={styles.body}
				showsVerticalScrollIndicator={false}
			>
				<SalesSummaryCard />
				<View style={{ height: 10 }} />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
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
				<View style={{ height: 20 }} />
				<Text style={{ color: '#FFFFFF80', fontSize: 18 }}>Resumen por turno</Text>
				<ShiftSummary
					startedAt='14:00:00'
					amount={24600}
					seller={{
						name: 'Merlina Adams',
						photoUrl: 'https://i.pinimg.com/originals/72/b7/75/72b7750d15997304dc46b4f6a3d9a6a0.jpg'
					}}
				/>
				<ShiftSummary
					startedAt='08:00:00'
					amount={46024}
					seller={{
						name: 'Daenerys T.',
						photoUrl: 'https://i.pinimg.com/originals/7a/0e/77/7a0e77183f2da4e73835e78a09cd0a31.jpg'
					}}
				/>
				<ShiftSummary
					startedAt='14:00:00'
					amount={24600}
					seller={{
						name: 'Pita Mellark',
						photoUrl: 'https://i.pinimg.com/originals/67/ef/75/67ef751ef83c2ca9e18358fed5de0038.jpg'
					}}
				/>
				<ShiftSummary
					startedAt='09:30:00'
					amount={24600}
					seller={{
						name: 'Oppenheimer',
						photoUrl: 'https://i.pinimg.com/originals/62/4a/2f/624a2fda3e0da8e55b4ea60b0949affa.png'
					}}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BgPrimary,
		paddingBottom: 50
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center'
	},
	body: {
		minHeight: '100%',
		paddingBottom: 70,
		gap: 10
	}
});