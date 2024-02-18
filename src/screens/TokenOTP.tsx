import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { Image } from 'expo-image';

import { Button, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import { useTotpToken } from '@/hooks/useAuth';

export default function TokenOtpScreen() {
	const [remainTime, setRemainTime] = useState(0);
	const [token, remaining] = useTotpToken();

	useEffect(() => {
		if (!remaining) {
			return;
		}

		setRemainTime(remaining);
		let interval = setInterval(() => {
			setRemainTime(remain => remain > 0 ? remain - 1 : 0);
		}, 1000);

		return () => clearInterval(interval);
	}, [remaining, token]);

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
					<Text style={styles.code}>{token ? token?.match(/.{1,2}/g)?.join(' ') : '- - -  - - -'}</Text>
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
						onPress={() => Share.share({ message: `Token Beta-POS\n${token}` })}
					>
						Compartir
					</Button>

					<Button
						medium
						type='primary'
						icon={require('@/assets/icons/document-copy.png')}
						onPress={async () => {
							token && await Clipboard.setStringAsync(token.replace(/\s/g, ''));
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
