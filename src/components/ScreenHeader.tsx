import { memo } from 'react';
import { View, Text } from 'react-native';

import BackButton from './BackButton';
import RenderIf from './RenderIf';

interface ScreenHeaderProps {
	title?: string;
}

const ScreenHeader = ({ title }: ScreenHeaderProps) => (
	<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
		<BackButton />

		<RenderIf condition={title !== undefined}>
			<Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>
				{title}
			</Text>
		</RenderIf>

		<RenderIf condition={title !== undefined}>
			<View style={{ width: 38 }} />
		</RenderIf>
	</View>
);

export default memo(ScreenHeader);
