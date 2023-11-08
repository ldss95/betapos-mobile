import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '@/types/routes';

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.makeUrl('/')],
	config: {
		screens: {
			Login: {
				screens: {
					LoginScreen: 'login'
				}
			},
			Root: {
				screens: {
					Home: 'home'
				}
			},
		}
	}
};

export default linking;
