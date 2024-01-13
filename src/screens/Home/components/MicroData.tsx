import { memo } from 'react';
import {
	View,
	Text,
	Image,
	ImageSourcePropType,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import { format } from '@/utils/helpers';
import { RenderIf } from '@/components';

interface MicroDataProps {
	value: number;
	label: string;
	icon: ImageSourcePropType;
	loading?: boolean;
}

const MicroData = ({ icon, label, value, loading }: MicroDataProps) => (
	<View style={{ alignItems: 'center' }}>
		<Image
			source={icon}
			style={{ width: 24, height: 24 }}
		/>
		<Text style={styles.label}>{label}</Text>
		<RenderIf condition={!!loading}>
			<ActivityIndicator color='#FFF' />
		</RenderIf>
		<RenderIf condition={!loading}>
			<Text style={styles.value}>$ {format.cash(value)}</Text>
		</RenderIf>
	</View>
);

const styles = StyleSheet.create({
	label: {
		fontSize: 12,
		color: '#FFFFFF70',
		fontWeight: '300'
	},
	value: {
		fontSize: 12,
		color: '#FFF'
	}
});

export default memo(MicroData);