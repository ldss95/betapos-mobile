import { memo, useState } from 'react';
import { Modal } from 'react-native';
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
				transparent
			>
				<BlurView style={{ height: '100%', justifyContent: 'center' }}>
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
				</BlurView>
			</Modal>
		</>
	);
}

export default memo(DatePicker);
