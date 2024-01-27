import { BlurView } from 'expo-blur';
import { ReactElement, memo, useEffect, useMemo, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { Subject } from 'rxjs';

import Colors from '@/constants/Colors';
import RenderIf from './RenderIf';
import Button from './Button';

interface AlertProps {
	type: 'success' | 'error' | 'warning';
	title: string;
	description: string | ReactElement;
	showCancelButton?: boolean;
	cancelButtonText?: string;
	showConfirmButton?: boolean;
	confirmButtonText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

const Alert$ = new Subject<AlertProps>();

const Alert = () => {
	const [visible, setVisible] = useState(false);
	const [config, setConfig] = useState<AlertProps | null>(null);
	const icon: ImageSourcePropType = useMemo(() => {
		if (!config?.type) {
			return {
				uri: ''
			}
		}

		if (config.type === 'error') {
			return require('@/assets/icons/error.png')
		}

		if (config.type === 'warning') {
			return require('@/assets/icons/warning.png')
		}

		if (config.type === 'success') {
			return require('@/assets/icons/success.png')
		}
	}, [config?.type]);

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
						source={icon}
						style={styles.icon}
					/>
					<Text
						style={[
							styles.title,
							{
								...config?.type === 'error' && styles.textError,
								...config?.type === 'success' && styles.textSuccess,
								...config?.type === 'warning' && styles.textWarning,
							}
						]}
					>
						{config?.title}
					</Text>
					<Text style={styles.description}>{config?.description}</Text>

					<RenderIf condition={!!config?.showCancelButton || !!config?.showConfirmButton}>
						<View style={{ flexDirection: 'row', marginTop: 20, gap: 20 }}>
							<RenderIf condition={!!config?.showCancelButton}>
								<Button
									borderColor={Colors.ColorPrimary}
									onPress={() => {
										config?.onCancel && config.onCancel();
										setVisible(false)
									}}
									auto
									medium
								>
									{config?.cancelButtonText || ''}
								</Button>
							</RenderIf>
							<RenderIf condition={!!config?.showConfirmButton}>
								<Button
									type='error'
									onPress={() => {
										config?.onConfirm && config.onConfirm();
										setVisible(false)
									}}
									auto
									medium
								>
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
		color: '#FFF',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	textWarning: {
		color: Colors.ColorWarning
	},
	textError: {
		color: Colors.ColorError
	},
	textSuccess: {
		color: Colors.ColorSuccess
	},
	description: {
		color: '#FFF',
		alignSelf: 'center'
	}
});

export default memo(Alert);

export const showAlert = (config: AlertProps) => Alert$.next(config);
