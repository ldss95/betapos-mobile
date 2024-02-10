import { Image } from 'expo-image';
import { memo } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';
import { format } from '@/utils/helpers';

const ShiftResultIndicator = ({ result }: { result: number | null; }) => {
	if (result === null) {
		return <></>;
	}

	if (result === 0) {
		return (
			<View style={[styles.resultContainer, { borderColor: Colors.ColorSuccess }]}>
				<Image
					style={styles.resultIcon}
					source={require('@/assets/icons/success.png')}
				/>
				<Text
					style={[
						styles.resultText,
						{ color: Colors.ColorSuccess }
					]}
				>
					Sin diferencias
				</Text>
				<Text style={{ color: Colors.ColorSuccess }}>Cuadre</Text>
			</View>
		)
	}

	if (result > 0) {
		return (
			<View style={[styles.resultContainer, { borderColor: Colors.ColorWarning }]}>
				<Image
					style={styles.resultIcon}
					source={require('@/assets/icons/warning.png')}
				/>
				<Text
					style={[
						styles.resultText,
						{ color: Colors.ColorWarning }
					]}
				>
					+{format.cash(result, 2)}
				</Text>
				<Text style={{ color: Colors.ColorWarning }}>Cuadre</Text>
			</View>
		);
	}

	if (result < 0) {
		return (
			<View style={[styles.resultContainer, { borderColor: Colors.ColorError }]}>
				<Image
					style={styles.resultIcon}
					source={require('@/assets/icons/error.png')}
				/>
				<Text
					style={[
						styles.resultText,
						{ color: Colors.ColorError }
					]}
				>
					{format.cash(result, 2)}
				</Text>
				<Text style={{ color: Colors.ColorError }}>Cuadre</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	resultContainer: {
		width: 150,
		height: 150,
		borderWidth: 1,
		alignSelf: 'center',
		borderRadius: 75,
		justifyContent: 'center',
		gap: 5,
		alignItems: 'center'
	},
	resultIcon: {
		width: 46,
		height: 46,
		alignSelf: 'center'
	},
	resultText: {
		fontWeight: 'bold',
		fontSize: 18
	}
});

export default memo(ShiftResultIndicator);
