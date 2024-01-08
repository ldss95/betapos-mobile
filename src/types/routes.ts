import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Loading: undefined;
	Login: undefined;
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	SaveExpense: undefined;
	Profile: undefined;
	Notifications: undefined;
	Business: undefined;
	Billing: undefined;
	SecurityAndPassword: undefined;
	ChangePassword: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>;

export type RootTabParamList = {
	Home: undefined;
	Expenses: undefined;
	Token: undefined;
	Config: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	NativeStackScreenProps<RootStackParamList>
>;
