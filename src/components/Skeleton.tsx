import { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, LayoutChangeEvent, Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface SkeletonProps {
	active: boolean;
}

const Skeleton = ({ active }: SkeletonProps) =>  {
	const [translateX, setTranslateX] = useState<Animated.Value | undefined>();
	const [animation, setAnimation] = useState<Animated.CompositeAnimation | undefined>();
	const [width, setWidth] = useState<number | undefined>();

	useEffect(() => {
		if (!animation || Platform.OS === 'android') {
			return;
		}

		if (active) {
			animation.start();
		} else {
			animation.stop();
		}

		return () => animation?.stop();
	}, [active, animation]);

	useEffect(() => {
		if (!width || ! translateX) {
			return;
		}

		setAnimation(
			Animated.loop(
				Animated.timing(translateX, {
					toValue: width,
					useNativeDriver: true,
					duration: 1000
				})
			)
		);
	}, [translateX, width]);

	function handleLayoutChange({ nativeEvent }: LayoutChangeEvent) {
		const { width } = nativeEvent.layout;
		setWidth(width);
		setTranslateX(
			new Animated.Value(width * -1)
		);
	}

	if (!active) {
		return null;
	}

	if (Platform.OS === 'android') {
		return (
			<View
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 100
				}}
			>
				<ActivityIndicator color='#FFF' size='large' />
			</View>
		)
	}

	return (
		<BlurView
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 100
			}}
			intensity={15}
			tint='dark'
			onLayout={handleLayoutChange}
		>
			<Animated.View
				style={{
					width: '100%',
					height: '100%',
					...(translateX && {
						transform: [{ translateX }]
					})
				}}
			>
				<LinearGradient
					style={{ width: '100%', height: '100%' }}
					colors={['transparent', 'rgba(255, 255, 255, 0.2)', 'transparent']}
					start={{ x: 1, y: 1 }}
				/>
			</Animated.View>
		</BlurView>
	);
}

export default memo(Skeleton);
