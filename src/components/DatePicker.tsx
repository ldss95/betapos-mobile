import { memo, useState } from 'react';
import { Modal, TouchableOpacity, Image, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { BlurView } from 'expo-blur';
import dayjs from 'dayjs';

import Input from './Input';

interface DatePickerProps {
	value?: string;
	label: string;
	onChange?: (date?: string) => void;
}

const DatePicker = ({ value, label, onChange }: DatePickerProps) => {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<>
			<Input
				label={label}
				defaultValue={value ? dayjs(value).format('DD MMM YYYY') : ''}
				onPressIn={() => setShowPicker(true)}
				editable={false}
			/>

			<Modal
				visible={showPicker}
				animationType='slide'
				transparent
			>
				<BlurView style={{ height: '100%', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
					<Text style={{ color: '#FFF', fontSize: 20 }}>Selecciona una fecha</Text>

					<DateTimePicker
						value={value ? dayjs(value).toDate() : new Date()}
						display='inline'
						locale='es-DO'
						timeZoneOffsetInMinutes={-4}
						onChange={(_, date) => {
							onChange && onChange(date?.toISOString().substring(0, 10));
							setShowPicker(false);
						}}
					/>

					<TouchableOpacity
						style={{
							width: 60,
							height: 60,
							backgroundColor: 'grey',
							borderRadius: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onPress={() => setShowPicker(false)}
					>
						<Image source={require('@/assets/icons/arrow-left.png')} style={{ width: 40, height: 40 }} />
					</TouchableOpacity>
				</BlurView>
			</Modal>
		</>
	);
}

export default memo(DatePicker);
