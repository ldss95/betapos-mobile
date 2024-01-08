import { Text, StyleSheet } from 'react-native';

import { BackButton, ScreenContainer } from '@/components';
import PendingInvoiceCard from '../components/PendingInvoiceCard';
import Receipt from '../components/Receipt';

export default function BillingScreen() {
	return (
		<ScreenContainer>
			<BackButton />
			<Text style={styles.title}>Tus Facturas</Text>

			<PendingInvoiceCard
				amount={1000}
				date='2023-12-28'
				invoiceNumber='INV-123456'
				paymentLink='https://google.com.do'
				invoiceUrl='https://google.com.do'
			/>

			<Receipt amount={1000} date='2023-11-28' receiptUrl='https://google.com.do' />
			<Receipt amount={1000} date='2023-10-28' receiptUrl='https://google.com.do' />
			<Receipt amount={1000} date='2023-09-28' receiptUrl='https://google.com.do' />
			<Receipt amount={1000} date='2023-08-28' receiptUrl='https://google.com.do' />
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	title: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10
	}
});