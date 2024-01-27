import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	ImageSourcePropType,
	ActivityIndicator
} from 'react-native';
import * as Application from 'expo-application';
import * as WebBrowser from 'expo-web-browser';
import { Image } from 'expo-image';

import { Avatar, RenderIf, ScreenContainer } from '@/components';
import Colors from '@/constants/Colors';
import Space from '@/constants/Space';
import { RootTabScreenProps } from '@/types/routes';
import { ApiUrl } from '@/constants/Environment';
import { useSessionStore } from '@/store/session';
import { useLogout } from '@/hooks/useAuth';
import { WebBrowserOptions } from '@/utils/helpers';

export default function ConfigScreen({ navigation }: RootTabScreenProps<'Config'>) {
	const session = useSessionStore(({ session }) => session);
	const [logout, loginOut] = useLogout();

	return (
		<ScreenContainer hasBottomTabs>
			<TouchableOpacity
				style={styles.profileCardContainer}
				onPress={() => navigation.navigate('Profile')}
			>
				<Avatar
					url={session?.photoUrl!}
					placeholderLabel={
						`${session?.firstName?.charAt(0)}` +
						session?.lastName?.charAt(0)
					}
					size={60}
				/>

				<View>
					<Text style={styles.name}>{session?.firstName} {session?.lastName}</Text>
					<Text style={styles.email}>{session?.email}</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.optionsContainer}>
				<Option
					icon={require('@/assets/icons/config/lock-slash.png')}
					text='Seguridad y Contraseña'
					onPress={() => navigation.navigate('SecurityAndPassword')}
				/>
				<Option
					icon={require('@/assets/icons/config/coin.png')}
					text='Facturación'
					onPress={() => navigation.navigate('Billing')}
				/>
				<Option
					icon={require('@/assets/icons/config/bank.png')}
					text='Mi Negocio'
					onPress={() => navigation.navigate('Business')}
				/>
				<Option
					icon={require('@/assets/icons/config/notification.png')}
					text='Notificaciones'
					onPress={() => navigation.navigate('Notifications')}
				/>
				<Option
					icon={require('@/assets/icons/config/security-user.png')}
					text='Politicas de Privacidad'
					onPress={() => WebBrowser.openBrowserAsync(`${ApiUrl}/legal/politicas-de-privacidad`, WebBrowserOptions)}
				/>
				<Option
					icon={require('@/assets/icons/config/task-square.png')}
					text='Términos y Condiciones'
					onPress={() => WebBrowser.openBrowserAsync(`${ApiUrl}/legal/terminos-y-condiciones`, WebBrowserOptions)}
				/>
			</View>

			<TouchableOpacity
				style={styles.logoutButton}
				onPress={() => logout(
					() => navigation.reset({
						index: 0,
						routes: [{ name: 'Login' as any }]
					})
				)}
			>
				<Image
					source={require('@/assets/icons/config/logout.png')}
					style={{ width: 24, height: 24 }}
				/>
				<Text style={styles.optionText}>Cerrar Sesión</Text>

				<RenderIf condition={loginOut}>
					<ActivityIndicator color='#FFF' />
				</RenderIf>
			</TouchableOpacity>

			<Text style={styles.version}>Version {Application.nativeApplicationVersion}</Text>
		</ScreenContainer>
	)
}

interface OptionProps {
	text: string;
	onPress?: () => void;
	icon: ImageSourcePropType;
}

const Option = ({ text, onPress, icon }: OptionProps) => (
	<TouchableOpacity style={styles.option} onPress={onPress}>
		<Image source={icon} style={{ height: 24, width: 24 }} />
		<Text style={styles.optionText}>{text}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	name: {
		color: '#FFF',
		fontSize: 16,
		fontWeight:'bold'
	},
	email: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: '400'
	},
	version: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 14
	},
	profileCardContainer: {
		backgroundColor: Colors.BgCard,
		padding: 10,
		borderRadius: Space.BorderSm,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	optionsContainer: {
		padding: 10,
		backgroundColor: Colors.BgCard,
		borderRadius: Space.BorderSm,
		gap: 20
	},
	option: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	optionText: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '600'
	},
	logoutButton: {
		backgroundColor: Colors.BgCard,
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: Space.BorderSm,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	}
});
