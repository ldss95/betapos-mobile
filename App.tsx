import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from 'sentry-expo';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useNavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { locale } from 'dayjs';
import esLocale from 'dayjs/locale/es-do';
locale(esLocale);

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	environment: __DEV__ ? 'development' : 'production',
	enableNative: !__DEV__,
	enableInExpoDevelopment: true
});

import Navigation from './src/navigation';
import { RootStackParamList } from '@/types/routes';
import { Unauthorized$ } from '@/utils/helpers';
import { useSessionStore } from '@/store/session';
import { Alert } from '@/components';
import { handleNewNotification } from '@/utils/notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	})
});

function App() {
	const navigation = useNavigationContainerRef<RootStackParamList>();
	const setSession = useSessionStore(({ setSession }) => setSession);

	useEffect(() => {
		if (!navigation) {
			return;
		}

		const notificationListener = Notifications
			.addNotificationReceivedListener(event => handleNewNotification(event, navigation));
		const responseListener = Notifications
			.addNotificationResponseReceivedListener(event => handleNewNotification(event, navigation));

		return () => {
			Notifications.removeNotificationSubscription(notificationListener);
			Notifications.removeNotificationSubscription(responseListener);
		};
	}, [navigation]);

	useEffect(() => {
		if (!navigation) {
			return;
		}

		const subscription = Unauthorized$.subscribe(async () => {
			const route = navigation.getCurrentRoute()?.name;
			if (route === 'Login') {
				return;
			}
			await setSession(null);
			navigation.reset({
				index: 0,
				routes: [{ name: 'Login' }],
			});
		});

		return () => subscription.unsubscribe();
	}, [navigation]);

	return (
		<SafeAreaProvider>
			<Navigation navRef={navigation} />
			<Alert />
		</SafeAreaProvider>
	);
}

export default gestureHandlerRootHOC(App);
