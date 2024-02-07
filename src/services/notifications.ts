import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Sentry from 'sentry-expo';

import http from '@/utils/http';

export async function setUpNotifications() {
	let deviceId = await AsyncStorage.getItem('deviceId');
	if (!deviceId) {
		deviceId = Crypto.randomUUID();
		await http.post('/users/devices', {
			identifier: deviceId,
			os: Platform.OS
		});
		await AsyncStorage.setItem('deviceId', deviceId);
	}

	let pushToken = await AsyncStorage.getItem('pushToken');
	if (pushToken) {
		return;
	}

	pushToken = await getPushToken();
	if (!pushToken) {
		return;
	}

	await http.post('/users/devices/tokens', {
		deviceIdentifier: deviceId,
		token: pushToken
	});
	await AsyncStorage.setItem('pushToken', deviceId);
}

async function getPushToken() {
	try {
		if (!Device.isDevice) {
			return null;
		}

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		const { status, canAskAgain } = await Notifications.getPermissionsAsync();
		if (status !== 'granted' && !canAskAgain) {
			return null;
		}

		if (status !== 'granted' && canAskAgain) {
			await Notifications.requestPermissionsAsync();
			return getPushToken();
		}

		const { data: token } = await Notifications.getExpoPushTokenAsync({
			projectId: 'b00faef6-54f9-4db0-bb23-3696d44035f8'
		});

		return token;
	} catch (error) {
		Sentry.Native.captureException(error);
		return null;
	}
}
