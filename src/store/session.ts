import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionStoreProps } from '@/types/store';
import { SessionProps } from '@/types/auth';

export const useSessionStore = create<SessionStoreProps>((set) => ({
	session: null,
	setSession: async (session: SessionProps | null) => {
		set((state) => ({
			...state,
			session
		}));

		if (session) {
			await AsyncStorage.setItem('session', JSON.stringify(session))
		} else {
			await AsyncStorage.removeItem('session');
		}
	}
}));

(async () => {
	const data = await AsyncStorage.getItem('session');
	if (!data) {
		return;
	}

	const session = JSON.parse(data);
	useSessionStore.setState(state => ({
		...state,
		session
	}));
})();
