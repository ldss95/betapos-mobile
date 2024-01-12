import { memo, useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface SkeletonProps {
	active: boolean;
}

const Skeleton = ({ active }: SkeletonProps) =>  {
	const translateX = useRef<Animated.Value | undefined>();
	const animation = useRef<Animated.CompositeAnimation | undefined>();

	useEffect(() => {
		if (!animation.current) {
			return;
		}

		if (active) {
			animation.current.start();
		} else {
			animation.current.stop();
		}
	}, [active]);

	function handleLayoutChange({ nativeEvent }: LayoutChangeEvent) {
		const { width } = nativeEvent.layout;

		translateX.current = new Animated.Value(
			width * -1
		);

		animation.current = Animated.loop(
			Animated.timing(translateX.current, {
				toValue: width,
				useNativeDriver: true,
				duration: 1000
			})
		);
	}

	if (!active) {
		return <></>;
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
					...(translateX.current && {
						transform: [{ translateX: translateX.current }]
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
