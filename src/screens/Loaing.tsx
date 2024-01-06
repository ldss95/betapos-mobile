import { useEffect } from 'react';

import { useSessionStore } from '@/store/session';
import { RootStackScreenProps } from '@/types/routes';

export default function LoadingScreen({ navigation }: RootStackScreenProps<'Loading'>) {
	const session = useSessionStore(({ session }) => session);

	useEffect(() => {
		if (session) {
			navigation.replace('Root');
		} else {
			navigation.replace('Login');
		}
	}, [session]);

	return <></>;
}