import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Login: undefined;
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootTabParamList = {
	Home: undefined;
	Expenses: undefined;
	Config: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	NativeStackScreenProps<RootStackParamList>
>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
