import { ScreenContainer, ScreenHeader } from '@/components';
import NotificationConfigItem from '../components/NotificationConfigItem';
import { useFetchSettings, useUpdateSettings } from '@/hooks/useSettings';
import useErrorHandling from '@/hooks/useError';

export default function NotificationsScreen() {
	const [settings, loading, error] = useFetchSettings();
	const [update, _, updateError] = useUpdateSettings();
	useErrorHandling(error || updateError);

	return (
		<ScreenContainer>
			<ScreenHeader title='Notificaciones' />

			<NotificationConfigItem
				title='Nuevo Turno'
				description='Recibe una notificación cada vez que tus cajeros empiecen su turno.'
				value={settings?.notifications?.newShift ?? false}
				onChange={(value) => update({ 'notifications.newShift': value })}
				loading={loading}
			/>

			<NotificationConfigItem
				title='Cierre Turno'
				description='Recibe una notificación cada vez que tus cajeros terminen su turno, con un resumen.'
				value={settings?.notifications?.endShift ?? false}
				onChange={(value) => update({ 'notifications.endShift': value })}
				loading={loading}
			/>

			<NotificationConfigItem
				title='Baja existencia'
				description='Recibe una notificación cuando algún producto alcance su punto mínimo.'
				value={settings?.notifications?.lowStock ?? false}
				onChange={(value) => update({ 'notifications.lowStock': value })}
				loading={loading}
			/>

			<NotificationConfigItem
				title='Próximos compromisos'
				description='Recibe una notificación a medida que se acercan las fechas de pago de tus facturas.'
				value={settings?.notifications?.nearestResponsibilities ?? false}
				onChange={(value) => update({ 'notifications.nearestResponsibilities': value })}
				loading={loading}
			/>

			<NotificationConfigItem
				title='Autorización requerida'
				description='Recibe una notificación cuando algún usuario requiera tu autorización.'
				value={settings?.notifications?.requiredAuthorization ?? false}
				onChange={(value) => update({ 'notifications.requiredAuthorization': value })}
				loading={loading}
			/>
		</ScreenContainer>
	)
}
