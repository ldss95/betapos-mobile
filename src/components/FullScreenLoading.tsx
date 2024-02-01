import { memo } from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

const FullScreenLoading = ({ visible }: { visible: boolean; }) => {
	return (
		<Modal
			transparent
			visible={visible}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.8)'
				}}
			>
				<ActivityIndicator size='large' />
				<Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>Cargano</Text>
				<Text style={{ color: '#FFF' }}>Por favor espere</Text>
			</View>
		</Modal>
	);
}

export default memo(FullScreenLoading);
