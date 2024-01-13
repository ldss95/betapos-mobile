import {
	memo,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Dimensions,
	Keyboard,
	Image
} from 'react-native'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import Space from '@/constants/Space';
import Colors from '@/constants/Colors';

const { height } = Dimensions.get('screen');

interface DropDownProps {
	options: {
		value: string | number | boolean;
		label: string;
	}[];
	label?: string;
	onDone?: (value: (number | string | boolean)[]) => void;
	height?: string;
	multiple?: boolean;
	defaultValues?: (string | number | boolean)[];
}

const Select = ({ options, label, onDone, ...props }: DropDownProps) => {
	const ModalRef = useRef<Modalize>(null);
	const numericHeight = useMemo(() => {
		if (!height) {
			return 400;
		}

		if (props.height) {
			return (height / 100) * parseInt(props.height.replace('%', ''));
		}

		return (height / 100) * 40;
	}, [props?.height, height]);


	const [selected, setSelected] = useState<(number | string | boolean)[]>(props.defaultValues || []);
	const [visible, setVisible] = useState(false);

	const placeholder = useMemo(() => {
		if (selected.length === 0) {
			return '';
		}

		if (!props?.multiple) {
			return options.find(({ value }) => value === selected[0])?.label;
		}
	}, [selected, props.multiple]);

	useEffect(() => {
		if (props?.defaultValues) {
			setSelected(props.defaultValues);
		}
	}, [props?.defaultValues]);

	useEffect(() => {
		if (visible) {
			Keyboard.dismiss();
			return ModalRef.current?.open();
		}

		ModalRef.current?.close();
	}, [visible]);

	function handleDoneButtonPress() {
		onDone && onDone(selected);
		setVisible(false);
	}

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={styles.input}
				onPress={() => setVisible(true)}
			>
				<Text style={styles.inputText}>{placeholder}</Text>

				<Image
					source={require('@/assets/icons/arrow-circle-down.png')}
					style={{ width: 24, height: 24 }}
				/>
			</TouchableOpacity>

			<Portal>
				<Modalize
					ref={ModalRef}
					modalHeight={numericHeight}
					modalStyle={{
						backgroundColor: Colors.BgCard,
						padding: 20
					}}
					onClose={() => setVisible(false)}
					scrollViewProps={{ showsVerticalScrollIndicator: false }}
					HeaderComponent={
						<View style={styles.header}>
							<Text style={styles.title}>{label}</Text>
							<TouchableOpacity onPress={handleDoneButtonPress} style={styles.doneButton}>
								<Text style={styles.doneButtonText}>Guardar</Text>
							</TouchableOpacity>
						</View>
					}
				>
					{options.map((item, index) => (
						<TouchableOpacity
							onPress={() => {
								if (!props?.multiple) {
									return setSelected([item.value]);
								}

								if (selected.includes(item.value)) {
									return setSelected(selected.filter((value) => value !== item.value));
								}

								setSelected([...selected, item.value]);
							}}
							style={styles.option}
							key={'op-modal-' + index}
						>
							<Text style={{ color: '#fff' }}>{item.label}</Text>
							<View
								style={[
									styles.radioContainer, {
										...(selected.includes(item.value) && {
											borderColor: Colors.ColorSecondary
										})
									}
								]}
							>
								<View
									style={[
										styles.radioBody, {
											...(selected.includes(item.value) && {
												backgroundColor: Colors.ColorSecondary
											})
										}
									]}
								/>
							</View>
						</TouchableOpacity>
					))}
				</Modalize>
			</Portal>
		</View>
	)
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	inputText: {
		color: '#fff',
		fontSize: 18,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		color: '#fff',
		fontSize: 18,
		maxWidth: '70%'
	},
	doneButton: {
		paddingVertical: 15,
		paddingLeft: 20
	},
	doneButtonText: {
		fontWeight: 'bold',
		color: Colors.ColorSecondary,
		fontSize: 18
	},
	option: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	radioContainer: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'grey',
		justifyContent: 'center',
		alignItems: 'center'
	},
	radioBody: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: 'grey'
	}
});

export default memo(Select);
