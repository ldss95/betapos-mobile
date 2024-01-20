import { memo, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import dayjs from 'dayjs';
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { shareAsync } from 'expo-sharing';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';
import { WebBrowserOptions, format } from '@/utils/helpers';
import { RenderIf, Skeleton } from '@/components';
import { showAlert } from '@/components/Alert';

interface ReceiptProps {
	amount: number;
	receiptUrl?: string;
	date: string;
	loading?: boolean;
	invoiceNumber: string;
}

const Receipt = ({ amount, date, receiptUrl, loading = false, invoiceNumber }: ReceiptProps) => {
	const [downloading, setDownloading] = useState(false);

	async function handleDownload() {
		try {
			setDownloading(true);
			const { data } = await axios.get<{ file_url: string; }>(receiptUrl!);
			const { uri } =  await FileSystem.downloadAsync(
				data.file_url,
				FileSystem.cacheDirectory + invoiceNumber + '-receipt.pdf'
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

			<Text style={styles.amount}>$ {format.cash(amount, 2)}</Text>
			<Text style={styles.date}>{dayjs(date).format('DD MMM YYYY')}</Text>

			<TouchableOpacity
				onPress={() => {
					if (downloading) {
						return;
					}

					if (!receiptUrl || receiptUrl === '') {
						return;
					}

					if (!receiptUrl.includes('stripe')) {
						return WebBrowser.openBrowserAsync(receiptUrl, WebBrowserOptions);
					}

					handleDownload();
				}}
				style={{ opacity: receiptUrl ? 1 : 0.2, padding: 10 }}
			>
				<RenderIf condition={downloading}>
					<ActivityIndicator color='#FFF' />
				</RenderIf>

				<RenderIf condition={!downloading}>
					<Image
						source={require('@/assets/icons/document-download.png')}
						style={{ width: 24, height: 24 }}
					/>
				</RenderIf>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.BgCard,
		paddingLeft: 15,
		borderRadius: Space.BorderSm,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden'
	},
	amount: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '600'
	},
	date: {
		color: '#FFF',
		fontSize: 12
	}
})

export default memo(Receipt);
