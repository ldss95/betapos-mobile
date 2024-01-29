import { memo, useState } from 'react';
import {
	Modal,
	TouchableOpacity,
	Text,
	Platform,
	StyleSheet,
	View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import dayjs from 'dayjs';

import RenderIf from './RenderIf';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';

interface DatePickerProps {
	value?: string;
	label: string;
	onChange?: (date?: string) => void;
	required?: boolean;
}

const DatePicker = ({ value, label, onChange, required = false }: DatePickerProps) => {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<>
			<View>
				<Text style={styles.label}>
					{label}

					<RenderIf condition={required}>
						<Text style={{ color: 'red' }}>*</Text>
					</RenderIf>
				</Text>
				<TouchableOpacity
					style={styles.input}
					onPress={() => setShowPicker(true)}
				>
					<Text style={styles.value}>
						{value ? dayjs(value).format('DD MMM YYYY') : ''}
					</Text>
				</TouchableOpacity>
			</View>

			<Modal
				visible={showPicker}
				animationType='slide'
				transparent
			>
				<BlurView style={{ height: '100%', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
					<RenderIf condition={Platform.OS === 'ios'}>
						<Text style={{ color: '#FFF', fontSize: 20 }}>Selecciona una fecha</Text>
					</RenderIf>

					<DateTimePicker
						value={value ? dayjs(value).toDate() : new Date()}
						display='inline'
						locale='es-DO'
						timeZoneOffsetInMinutes={-4}
						onChange={(_, date) => {
							onChange && onChange(date?.toISOString().substring(0, 10));
							setShowPicker(false);
						}}
						onTouchCancel={() => setShowPicker(false)}
					/>

					<RenderIf condition={Platform.OS === 'ios'}>
						<TouchableOpacity
							style={styles.closeBtn}
							onPress={() => setShowPicker(false)}
						>
							<Image source={require('@/assets/icons/arrow-left.png')} style={{ width: 40, height: 40 }} />
						</TouchableOpacity>
					</RenderIf>
				</BlurView>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.8)',
		marginLeft: 12,
		marginBottom: 12
	},
	input: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		height: 60,
		paddingHorizontal: 20,
		justifyContent: 'center'
	},
	value: {
		color: '#fff',
		fontSize: 18
	},
	closeBtn: {
		width: 60,
		height: 60,
		backgroundColor: 'grey',
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default memo(DatePicker);
