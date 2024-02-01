import { useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard } from 'react-native';
import dayjs from 'dayjs';

import { Button, RenderIf, ScreenContainer, ScreenHeader } from '@/components';
import { RootStackScreenProps } from '@/types/routes';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { useVerifyResetPasswordCode } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';
import { CodeValidationResponse } from '@/types/auth';

export default function VerifyResetPasswordCodeScreen({ navigation, route }: RootStackScreenProps<'VerifyResetPasswordCode'>) {
	const { email, sentAt } = route.params;
	const inputs = useRef<(TextInput | null)[]>(Array.from({ length: 4 }));

	const [now, setNow] = useState(dayjs());
	const [code, setCode] = useState<string[]>([]);
	const [verify, loading, error] = useVerifyResetPasswordCode();
	const expireIn = useMemo(() => {
		const expireAt = sentAt.add(5, 'minutes');
		const remain = expireAt.diff(now, 'second');
		if (remain < 0) {
			return null;
		}

		const minutes = (remain > 60)
			? Math.floor(remain / 60).toString().padStart(2, '0')
			: '00';

		const seconds = (remain - (parseInt(minutes) * 60)).toString().padStart(2, '0');

		return `${minutes}:${seconds}`
	}, [sentAt, now]);
	useErrorHandling(error);

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(dayjs());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	function onPressVerify() {
		if (code.length !== 4) {
			return showAlert({
				title: 'Código invalido',
				description: 'Escribe el código completo',
				type: 'warning'
			});
		}

		verify(
			email,
			code.join(''),
			afterVerify
		);
	}

	function afterVerify({ isValid, expired }: CodeValidationResponse) {
		if (expired) {
			return showAlert({
				title: 'Código expirado',
				description: 'El código ya expiró',
				type: 'warning'
			});
		}

		if (!isValid) {
			return showAlert({
				title: 'Código invalido',
				description: 'El código no es correcto',
				type: 'warning'
			});
		}

		navigation.navigate('ResetPassword', {
			email,
			code: code.join('')
		})
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<View style={styles.container}>
				<ScreenHeader title='Verifica tu identidad' />
				<Text style={styles.description}>
					Hemos enviado un código de verificación a tu correo
					<Text style={{ fontWeight: 'bold' }}> {email}</Text>,
					digítalo aquí para cambiar contraseña.
				</Text>

				<View style={styles.inputsContainer}>
					{Array
						.from({ length: 4 })
						.map((_, index) => (
							<TextInput
								key={'OTP-input-' + index}
								ref={(ref) => inputs.current[index] = ref}
								style={styles.input}
								autoFocus={index === 0}
								maxLength={1}
								textAlign='center'
								value={code[index] || ''}
								keyboardType='number-pad'
								onKeyPress={({ nativeEvent }) => {
									if (index === 0) {
										return;
									}

									if (nativeEvent.key !== 'Backspace') {
										return;
									}

									if (!code[index] || code[index] === '') {
										const valuesCopy = [...code];
										valuesCopy[index - 1] = '';
										setCode(valuesCopy);
										inputs.current[index - 1]?.focus();
									}
								}}
								onChangeText={(text) => {
									const valuesCopy = [...code];
									valuesCopy[index] = text;
									setCode(valuesCopy);

									if (text !== '' && index < 5) {
										inputs.current[index + 1]?.focus();
									}

									if (text !== '' && index === 5) {
										Keyboard.dismiss();
									}
								}}
							/>
						))}
				</View>

				<RenderIf condition={expireIn === null}>
					<Text style={[styles.description, { textAlign: 'center', color: 'red' }]}>
						Este código ya expiró!
					</Text>
				</RenderIf>

				<RenderIf condition={expireIn !== null}>
					<Text style={[styles.description, { textAlign: 'center' }]}>
						Este código expira en: {expireIn}
					</Text>
				</RenderIf>
			</View>

			<Button
				type='primary'
				onPress={onPressVerify}
				loading={loading}
			>
				Verificar Código
			</Button>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		marginBottom: 200
	},
	description: {
		color: '#FFFFFF80',
		fontSize: 14,
		fontWeight: '400'
	},
	inputsContainer: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginVertical: 40
	},
	input: {
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		height: 60,
		width: 60,
		textAlign: 'center',
		fontSize: 24,
		color: '#FFF'
	}
});
