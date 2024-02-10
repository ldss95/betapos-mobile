import { Notification, NotificationResponse } from 'expo-notifications';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { NotificationType } from '@/types/notifications';
import { RootStackParamList } from '@/types/routes';

export async function handleNewNotification(data: Notification | NotificationResponse, navigation: NavigationContainerRefWithCurrent<RootStackParamList>) {
	const notification = (
		(data as NotificationResponse)?.notification?.request?.content ??
		(data as Notification)?.request?.content
	);

	if (notification.data.type === NotificationType.FinishedShift) {
		return navigation.navigate('Shift', {
			data: notification.data.shift
		});
	}

	if (notification.data.type === NotificationType.RequiredAuth) {
		return;
	}

	if (notification.data.type === NotificationType.NearestResponsibilities) {
		return;
	}
}
