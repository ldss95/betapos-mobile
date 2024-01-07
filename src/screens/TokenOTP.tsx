import { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

import { Button, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';

export default function TokenOtpScreen() {
	const [code, setCode] = useState('');
	const [remainTime, setRemainTime] = useState(0);

	useEffect(() => {
		setCode(getCode());
		setRemainTime(60);

		const codeInterval = setInterval(() => {
			setCode(getCode());
		}, 1000 * 60);

		const timeInterval = setInterval(() => {
			setRemainTime(remain => remain > 1 ? remain - 1 : 60);
		}, 1000);

		return () => {
			clearInterval(codeInterval);
			clearInterval(timeInterval);
		}
	}, []);

	function getCode() {
		const code = Math.random() * 999999;
		return Math
			.round(code)
			.toString()
			.replace(/(.{2})/g, '$1 ')
			.trim();
	}

	return (
		<ScreenContainer hasBottomTabs>
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<View>
					<Image
						source={require('@/assets/icons/tab-bar/token.png')}
						style={styles.icon}
					/>

					<Text style={styles.title}>Token</Text>
				</View>

				<View>
					<Text style={styles.code}>{code}</Text>
					<Text style={{ fontSize: 16, color: '#FFF', fontWeight: '300', textAlign: 'center' }}>
						Expira en
						<Text style={{ fontWeight: 'bold', color: Colors.ColorSecondary }}> {remainTime} </Text>
						segundos
					</Text>
				</View>

				<View style={styles.optionsContainer}>
					<Button
						medium
						icon={require('@/assets/icons/directbox-send.png')}
						onPress={() => Share.share({ message: `Token Beta-POS\n${code}` })}
					>
						Compartir
					</Button>

					<Button
						medium
						type='primary'
						icon={require('@/assets/icons/document-copy.png')}
						onPress={async () => {
							await Clipboard.setStringAsync(code.replace(/\s/g, ''));
							Toast.show('Código copiado', {
								position: Toast.positions.BOTTOM,
								hideOnPress: true
							});
						}}
					>
						Copiar
					</Button>
				</View>
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 100,
		height: 100,
		alignSelf: 'center'
	},
	title: {
		textAlign: 'center',
		color: '#FFF',
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 18
	},
	code: {
		fontSize: 48,
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center'
	},

	optionsContainer: {
		marginBottom: 100,
		flexDirection: 'row',
		justifyContent:'center',
		gap: 15
	}
});