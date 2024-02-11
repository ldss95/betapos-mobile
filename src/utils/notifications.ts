import { Notification, NotificationResponse } from 'expo-notifications';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { NotificationType } from '@/types/notifications';
import { RootStackParamList } from '@/types/routes';
import { showNotification } from '@/components/Notification';

export async function handleNewNotification(data: Notification | NotificationResponse, navigation: NavigationContainerRefWithCurrent<RootStackParamList>) {
	const notification = (
		(data as NotificationResponse)?.notification?.request?.content ??
		(data as Notification)?.request?.content
	);

	const type = ((data as Notification)?.request) ? 'Notification' : 'Response';

	if (notification.data.type === NotificationType.FinishedShift) {
		const currentRoute = navigation.getCurrentRoute();

		if (currentRoute?.name === 'Login' && type === 'Response') {
			navigation.setParams({
				afterLogin: {
					route: 'Shift',
					params: {
						data: notification.data.shift
					}
				}
			});

			return;
		}

		if (currentRoute?.name !== 'Login' && type === 'Response') {
			return navigation.navigate('Shift', {
				data: notification.data.shift
			});
		}

		if (currentRoute?.name !== 'Login' && type === 'Notification') {
			return showNotification({
				title: notification.title!,
				description: notification.body!,
				confirmButtonText: 'Ver detalles',
				onPressConfirm: () => navigation.navigate('Shift', {
					data: notification.data.shift
				})
			})
		}
	}

	if (notification.data.type === NotificationType.RequiredAuth) {
		return;
	}

	if (notification.data.type === NotificationType.NearestResponsibilities) {
		return;
	}
}
