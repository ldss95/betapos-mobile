import { ReactElement, memo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
const { height } = Dimensions.get('window');

interface ScreenContainerProps {
	children?: ReactElement[];
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
						minHeight: height - edges.top - edges.bottom - 80,
						...(justifySpaceBetween && { justifyContent: 'space-between' }),
						...(!hasBottomTabs && { paddingBottom: edges.bottom + 20 }),
						...(hasBottomTabs && { paddingBottom: 70 })
					}
				]}
				showsVerticalScrollIndicator={false}
			>
				{children}
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
		gap: 10
	}
});

export default memo(ScreenContainer);
