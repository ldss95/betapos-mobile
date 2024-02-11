import {
	memo,
	useEffect,
	useRef,
	useState
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Keyboard
} from 'react-native'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Subject } from 'rxjs';

import Colors from '@/constants/Colors';
import Button from './Button';

interface NotificationProps {
	title: string;
	description: string;
	confirmButtonText: string;
	onPressConfirm: () => void;
}

const Notification$ = new Subject<NotificationProps>();

const Notification = () => {
	const ModalRef = useRef<Modalize>(null);
	const [visible, setVisible] = useState(false);
	const [config, setConfig] = useState<Partial<NotificationProps>>({});

	useEffect(() => {
		if (visible) {
			Keyboard.dismiss();
			return ModalRef.current?.open();
		}

		ModalRef.current?.close();
	}, [visible]);

	useEffect(() => {
		const listener = Notification$
			.subscribe((config) => {
				setConfig(config);
				setVisible(true);
			});

		return () => listener.unsubscribe();
	}, []);

	return (
		<Portal>
			<Modalize
				ref={ModalRef}
				modalHeight={200}
				modalStyle={{
					backgroundColor: Colors.BgCard,
					padding: 20
				}}
				onClose={() => setVisible(false)}
				scrollViewProps={{ showsVerticalScrollIndicator: false }}
			>
				<View style={{ gap: 20 }}>
					<Text style={styles.title}>{config?.title}</Text>
					<Text style={styles.description}>{config?.description}</Text>
					<View style={{ flexDirection: 'row', gap: 20 }}>
						<Button
							medium
							auto
							borderColor='#FFFFFF50'
							onPress={() => setVisible(false)}
						>
							Cerrar
						</Button>
						<Button
							type='primary'
							medium
							auto
							onPress={() => {
								config?.onPressConfirm && config?.onPressConfirm();
								setVisible(false);
							}}
						>
							{config.confirmButtonText || ''}
						</Button>
					</View>
				</View>
			</Modalize>
		</Portal>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		color: '#FFF',
		fontWeight: 'bold'
	},
	description: {
		color: '#FFF',
		opacity: 0.8,
		fontSize: 16,
		fontWeight: '200'
	}
});

export default memo(Notification);

export const showNotification = (config: NotificationProps) => Notification$.next(config);
