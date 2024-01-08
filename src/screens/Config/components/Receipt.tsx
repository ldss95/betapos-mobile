import { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import dayjs from 'dayjs';
import * as WebBrowser from 'expo-web-browser';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';
import { WebBrowserOptions, format } from '@/utils/helpers';

interface ReceiptProps {
	amount: number;
	receiptUrl: string;
	date: string;
}

const Receipt = ({ amount, date, receiptUrl }: ReceiptProps) => (
	<View style={{ backgroundColor: Colors.BgCard, padding: 10, borderRadius: Space.BorderSm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
		<Text style={{ color: '#FFF', fontSize: 14, fontWeight: '600' }}>$ {format.cash(amount, 2)}</Text>
		<Text style={{ color: '#FFF', fontSize: 12 }}>{dayjs(date).format('DD MMM YYYY')}</Text>
		<TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(receiptUrl, WebBrowserOptions)}>
			<Image source={require('@/assets/icons/document-download.png')} style={{ width: 24, height: 24 }} />
		</TouchableOpacity>
	</View>
);

export default memo(Receipt);
