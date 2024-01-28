import { ReactElement, memo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
const { height } = Dimensions.get('window');

interface ScreenContainerProps {
	children?: ReactElement[] | ReactElement;
	hasBottomTabs?: boolean;
	justifySpaceBetween?: boolean;
}

const ScreenContainer = ({ children, justifySpaceBetween, hasBottomTabs }: ScreenContainerProps) => {
	const edges = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					...(hasBottomTabs && { paddingBottom: 50 })
				}
			]}
		>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20 }}
				contentContainerStyle={[
					styles.body,
					{
						flexGrow: 1,
						...(justifySpaceBetween && { justifyContent: 'space-between' }),
						...(!hasBottomTabs && { paddingBottom: edges.bottom }),
						...(hasBottomTabs && { paddingBottom: 70 })
					}
				]}
				showsVerticalScrollIndicator={false}
			>
				{children}
				<SafeAreaView edges={['bottom']} />
			</ScrollView>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		height,
		backgroundColor: Colors.BgPrimary,
	},
	body: {
		gap: 20
	}
});

export default memo(ScreenContainer);
