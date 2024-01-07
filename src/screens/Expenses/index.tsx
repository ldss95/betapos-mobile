import { View, StyleSheet, ScrollView, TextInput, Image, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { Button } from '@/components';
import ExpenseCard from './components/ExpenseCard';

export default function ExpensesScreen() {
	return (
		<View style={styles.container}>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20 }}
				contentContainerStyle={styles.body}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ position: 'relative' }}>
					<Image
						source={require('@/assets/icons/search.png')}
						style={styles.searchInputIcon}
					/>
					<TextInput
						placeholder='Buscar'
						placeholderTextColor='#FFFFFF80'
						style={styles.searchInput}
					/>
				</View>

				<View style={styles.summaryCardContainer}>
					<Text style={styles.summaryCardValue}>$ 86,500</Text>
					<Text style={styles.summaryCardLabel}>Gastos de hoy</Text>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
					<Button small style='rounded' type='secondary'>Hoy</Button>
					<Button small style='rounded'>Esta semana</Button>
					<Button small style='rounded'>Este mes</Button>
				</View>

				<Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>Historial</Text>

				<ExpenseCard
					time={'02:15\nPM'}
					category='Electricidad'
					description='Pago EDESUR'
					amount={16300}
				/>
				<ExpenseCard
					time={'08:16\nAM'}
					category='Telecomunicaciones'
					description='Factura de internet claro'
					amount={2100}
				/>
				<ExpenseCard
					time={'08:00\nAM'}
					category='Transporte'
					description='Combustible'
					amount={5600}
				/>
				<ExpenseCard
					time={'08:00\nAM'}
					category='Personal'
					description='Pago de nómina'
					amount={45000}
				/>
				<ExpenseCard
					time={'08:16\nAM'}
					category='Telecomunicaciones'
					description='Factura de claro'
					amount={2100}
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
		gap: 20
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
		backgroundColor: Colors.BgCard
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
	}
});
