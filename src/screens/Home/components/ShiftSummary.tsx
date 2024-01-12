import { memo } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import dayjs from 'dayjs';

import Colors from '@/constants/Colors';
import { format } from '@/utils/helpers';
import { RenderIf } from '@/components';
import Skeleton from '@/components/Skeleton';

interface ShiftSummaryProps {
	startedAt: string;
	amount: number;
	seller:{
		name: string;
		photoUrl?: string;
	};
	loading?: boolean;
}

const ShiftSummary = ({ startedAt, amount, seller, loading }: ShiftSummaryProps) => (
    <View style={styles.container}>
		<Skeleton active={!!loading} />

		<View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, width: 170 }}>
			<RenderIf condition={!!seller.photoUrl}>
				<Image
					source={{ uri: seller.photoUrl }}
					style={styles.sellerPhoto}
				/>
			</RenderIf>

			<RenderIf condition={!seller.photoUrl}>
				<View style={[styles.sellerPhoto, { opacity: 0.7 }]}>
					<Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>{seller.name.charAt(0)}</Text>
				</View>
			</RenderIf>

			<Text style={styles.sellerName}>{seller.name}</Text>
		</View>
		<Text style={styles.time}>{dayjs('2024-01-01 ' + startedAt).format('hh:mm A')}</Text>
		<Text style={styles.amount}>$ {format.cash(amount)}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.BgCard,
		padding: 10,
		overflow: 'hidden'
	},
	amount: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: 'bold'
	},
	time: {
		color: '#FFF',
		fontSize: 12
	},
	sellerName: {
		color: '#FFF',
		fontSize: 12
	},
	sellerPhoto: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.ColorSecondary,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default memo(ShiftSummary);