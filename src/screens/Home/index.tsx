import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import SalesSummaryCard from './components/SalesSummaryCard';

export default function HomeScreen() {
	const edges = useSafeAreaInsets();

	return (
		<View
			style={styles.container}
		>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20, paddingBottom: edges.bottom }}
				contentContainerStyle={styles.body}
			>
				<SalesSummaryCard />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BgPrimary
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center'
	},
	body: {
		justifyContent: 'space-between',
		height: '100%',
		alignItems: 'center'
	},
	forgotPassword: {
		color: Colors.ColorSecondary,
		fontSize: 14,
		textAlign: 'right'
	}
});