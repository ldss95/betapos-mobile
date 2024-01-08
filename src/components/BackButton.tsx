import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const BackButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={{  flexDirection: 'row', alignItems: 'center' }}
		>
			<Image source={require('@/assets/icons/arrow-left.png')} style={{ width: 28, height: 28 }} />
			<Text style={{ color: '#FFF', fontSize: 14 }}>Atras</Text>
		</TouchableOpacity>
	);
}

export default memo(BackButton);