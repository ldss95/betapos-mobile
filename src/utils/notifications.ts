import { Notification, NotificationResponse } from 'expo-notifications';
import { NotificationType } from '@/types/notifications';

export async function handleNewNotification(data: Notification | NotificationResponse) {
	const notification = (
		(data as NotificationResponse)?.notification?.request?.content ??
		(data as Notification)?.request?.content
	);

	if (notification.data.type === NotificationType.FinishedShift) {
		return;
	}

	if (notification.data.type === NotificationType.RequiredAuth) {
		return;
	}

	if (notification.data.type === NotificationType.NearestResponsibilities) {
		return;
	}
}
