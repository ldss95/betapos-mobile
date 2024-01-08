import { Text } from 'react-native';

import { BackButton, ScreenContainer } from '@/components';
import NotificationConfigItem from '../components/NotificationConfigItem';

export default function NotificationsScreen() {
	return (
		<ScreenContainer>
			<BackButton />
			<Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Notificaciones</Text>

			<NotificationConfigItem
				title='Nuevo Turno'
				description='Recibe una notificación cada vez que tus cajeros empiecen su turno.'
				value={false}
				onChange={() => null}
			/>

			<NotificationConfigItem
				title='Cierre Turno'
				description='Recibe una notificación cada vez que tus cajeros terminen su turno, con un resumen.'
				value={true}
				onChange={() => null}
			/>

			<NotificationConfigItem
				title='Baja existencia'
				description='Recibe una notificación cuando algún producto alcance su punto mínimo.'
				value={false}
				onChange={() => null}
			/>

			<NotificationConfigItem
				title='Próximos compromisos'
				description='Recibe una notificación a medida que se acercan las fechas de pago de tus facturas.'
				value={true}
				onChange={() => null}
			/>

			<NotificationConfigItem
				title='Autorización requerida'
				description='Recibe una notificación cuando algún usuario requiera tu autorización.'
				value={true}
				onChange={() => null}
			/>
		</ScreenContainer>
	)
}