import { ReactElement, memo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
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
			style={{
				height: (Platform.OS === 'android')
					? height + edges.bottom + edges.top
					: height,
				...(hasBottomTabs && { paddingBottom: 50 }),
				backgroundColor: Colors.BgPrimary,
			}}
		>
			<SafeAreaView edges={['top']} />
			<ScrollView
				style={{ padding: 20 }}
				contentContainerStyle={[
					styles.body,
					{
						...(justifySpaceBetween && { justifyContent: 'space-between' }),
						...(!hasBottomTabs && { paddingBottom: edges.bottom + 40 }),
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
	body: {
		flexGrow: 1,
		gap: 20
	}
});

export default memo(ScreenContainer);
