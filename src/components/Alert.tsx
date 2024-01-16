import { BlurView } from 'expo-blur';
import { ReactElement, memo, useEffect, useState } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Subject } from 'rxjs';

import Colors from '@/constants/Colors';
import RenderIf from './RenderIf';
import Button from './Button';

interface AlertProps {
	type: 'success' | 'error';
	title: string;
	description: string | ReactElement;
	showCancelButton?: boolean;
	cancelButtonText?: string;
	showConfirmButton?: boolean;
	confirmButtonText?: string;
}

const Alert$ = new Subject<AlertProps>();

const Alert = () => {
	const [visible, setVisible] = useState(false);
	const [config, setConfig] = useState<AlertProps | null>(null);

	useEffect(() => {
		const listener = Alert$
			.subscribe((config) => {
				setConfig(config);
				setVisible(true);
			});

		return () => listener.unsubscribe();
	}, []);

	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
		>
			<BlurView style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
						<Image source={require('@/assets/icons/close-circle.png')} style={{ width: 24, height: 24 }} />
					</TouchableOpacity>

					<Image
						source={
							(config?.type === 'error')
								? require('@/assets/icons/error.png')
								: require('@/assets/icons/success.png')
						}
						style={styles.icon}
					/>
					<Text
						style={[
							styles.title, {
								...(config?.type === 'error' && {
									color: '#C32A2A'
								})
							}
						]}
					>
						{config?.title}
					</Text>
					<Text style={styles.description}>{config?.description}</Text>

					<RenderIf condition={!!config?.showCancelButton || !!config?.showConfirmButton}>
						<View style={{ flexDirection: 'row', marginTop: 20, gap: 20 }}>
							<RenderIf condition={!!config?.showCancelButton}>
								<Button borderColor={Colors.ColorPrimary} auto medium>
									{config?.cancelButtonText || ''}
								</Button>
							</RenderIf>
							<RenderIf condition={!!config?.showConfirmButton}>
								<Button auto type='error' medium>
									{config?.confirmButtonText || ''}
								</Button>
							</RenderIf>
						</View>
					</RenderIf>
				</View>
			</BlurView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	body: {
		width: '80%',
		backgroundColor: Colors.BgCard,
		borderRadius: 20,
		padding: 20,
		gap: 10
	},
	closeBtn: {
		position: 'absolute',
		right: 0,
		top: 0,
		padding: 10
	},
	icon: {
		width: 64,
		height: 64,
		alignSelf: 'center'
	},
	title: {
		color: '#38B72D',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	description: {
		color: '#FFF',
		alignSelf: 'center'
	}
});

export default memo(Alert);

export const showAlert = (config: AlertProps) => Alert$.next(config);
