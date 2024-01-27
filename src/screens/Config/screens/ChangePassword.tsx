import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input, ScreenContainer, ScreenHeader } from '@/components';
import { RootStackScreenProps } from '@/types/routes';
import { useChangePassword } from '@/hooks/useAuth';
import useErrorHandling from '@/hooks/useError';
import { showAlert } from '@/components/Alert';

export default function ChangePasswordScreen({ navigation }: RootStackScreenProps<'ChangePassword'>) {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const [changePassword, loading, error] = useChangePassword();
	useErrorHandling(error);

	function handleChangePassword() {
		if (oldPassword === '' || newPassword === '' || newPasswordConfirm === '') {
			return;
		}

		if (newPassword !== newPasswordConfirm) {
			return showAlert({
				title: 'Contraseñas no Coinciden',
				description: 'Verifica tu nueva contraseña y su confirmacion e intentalo otra vez.',
				type: 'warning'
			});
		}

		changePassword(
			oldPassword,
			newPassword,
			() => {
				showAlert({
					title: 'Genial!',
					description: 'Tu contraseña ha sido cambiada.',
					type: 'success'
				});
				navigation.goBack();
			}
		);
	}

	return (
		<ScreenContainer justifySpaceBetween>
			<View style={{ gap: 20 }}>
				<ScreenHeader title='Nueva Contraseña' />

				<Input secureTextEntry label='Contraseña Actual' onChangeText={setOldPassword} />
				<Input secureTextEntry label='Nueva contraseña' onChangeText={setNewPassword} />
				<Input secureTextEntry label='Confirmar nueva contraseña' onChangeText={setNewPasswordConfirm} />
			</View>

			<Button
				type='primary'
				loading={loading}
				onPress={handleChangePassword}
			>
				Guardar contraseña
			</Button>
		</ScreenContainer>
	)
}
