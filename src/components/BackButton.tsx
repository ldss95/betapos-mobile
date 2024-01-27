import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import Colors from '@/constants/Colors';
import Space from '@/constants/Space';

const BackButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={styles.container}
		>
			<Image
				source={require('@/assets/icons/arrow-left.png')}
				style={{ width: 28, height: 28 }}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.BgCard,
		padding: 5,
		borderRadius: Space.BorderSm
	}
});

export default memo(BackButton);
