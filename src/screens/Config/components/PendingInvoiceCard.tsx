import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import * as WebBrowser from 'expo-web-browser';

import { Button } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { WebBrowserOptions, format } from '@/utils/helpers';

interface PendingInvoiceCardProps {
	amount: number;
	date: string;
	invoiceNumber: string;
	paymentLink: string;
	invoiceUrl: string;
}

const PendingInvoiceCard = ({ amount, date, invoiceNumber, paymentLink }: PendingInvoiceCardProps) => (
	<View style={styles.container}>
		<View style={styles.header}>
			<View style={{ flexDirection: 'row', gap: 5 }}>
				<Text style={styles.headerText}>
					Factura Pendiente
				</Text>
				<Text style={[styles.headerText, { fontWeight: 'bold'}]}>
					{invoiceNumber}
				</Text>
			</View>
			<Text style={[styles.headerText, { color: '#FFFFFF80' }]}>
				{dayjs(date).format('DD MMM YYYY')}
			</Text>
		</View>

		<Text style={styles.amount}>$ {format.cash(amount, 2)}</Text>

		<View style={{ flexDirection: 'row', gap: 20 }}>
			<View style={{ flex: 1 }}>
				<Button
					medium
					borderColor={Colors.ColorPrimary}
				>
					Descargar
				</Button>
			</View>
			<View style={{ flex: 1 }}>
				<Button
					type='primary'
					onPress={() => WebBrowser.openBrowserAsync(paymentLink, WebBrowserOptions)}
					medium
				>
					Pagar
				</Button>
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		borderWidth: 1,
		borderColor: Colors.ColorSecondary,
		borderRadius: Space.BorderSm,
		padding: 20,
		gap: 20
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerText: {
		color: '#FFF',
		fontWeight: '400',
		fontSize: 12
	},
	amount: {
		color: '#FFF',
		fontSize: 28,
		fontWeight: 'bold'
	}
});

export default memo(PendingInvoiceCard);