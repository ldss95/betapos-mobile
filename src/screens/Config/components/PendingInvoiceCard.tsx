import { memo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import { Button, Skeleton } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { WebBrowserOptions, format } from '@/utils/helpers';
import { showAlert } from '@/components/Alert';

interface PendingInvoiceCardProps {
	amount: number;
	date: string;
	invoiceNumber: string;
	paymentLink: string;
	invoiceUrl: string;
	loading?: boolean;
}

const PendingInvoiceCard = ({ amount, date, invoiceNumber, paymentLink, loading = false, invoiceUrl }: PendingInvoiceCardProps) => {
	const [downloading, setDownloading] = useState(false);

	async function handleDownload() {
		try {
			setDownloading(true);
			const { uri } =  await FileSystem.downloadAsync(
				invoiceUrl,
				FileSystem.cacheDirectory + invoiceNumber + '-invoice.pdf'
			);
			await shareAsync(uri);
		} catch (error) {
			showAlert({
				title: 'Error de descarga',
				description: 'No se pudo descargar y guardar el archivo PDF, por favor intentalo mas tarde, si el problema persiste contacta con soporte.',
				type: 'error'
			})
		} finally {
			setDownloading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Skeleton active={loading} />

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
						onPress={handleDownload}
						loading={downloading}
						disabled
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
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		borderWidth: 1,
		borderColor: Colors.ColorSecondary,
		borderRadius: Space.BorderSm,
		padding: 20,
		gap: 20,
		overflow: 'hidden'
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
