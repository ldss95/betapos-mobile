import React, { Ref } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, RootTabParamList } from '@/types/routes';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '@/constants/Colors';

import LoginScreen from '@/screens/Auth/Login';
import HomeScreen from '@/screens/Home';
import ExpensesScreen from '@/screens/Expenses';
import SaveExpenseScreen from '@/screens/Expenses/SaveExpense';
import ConfigScreen from '@/screens/Config';
import TokenOtpScreen from '@/screens/TokenOTP';
import ProfileScreen from '@/screens/Config/screens/Profile';
import NotificationsScreen from '@/screens/Config/screens/Notifications';
import BusinessScreen from '@/screens/Config/screens/Business';
import BillingScreen from '@/screens/Config/screens/Billing';
import SecurityAndPasswordScreen from '@/screens/Config/screens/SecurityAndPassword';
import ChangePasswordScreen from '@/screens/Config/screens/ChangePassword';
import ForgotPasswordScreen from '@/screens/Auth/ForgottenPassword';
import VerifyResetPasswordCodeScreen from '@/screens/Auth/VerifyResetPasswordCode';
import ResetPasswordScreen from '@/screens/Auth/ResetPassword';

interface NavigationProps {
	navRef: Ref<NavigationContainerRef<RootStackParamList>>;
}
export default function Navigation({ navRef }: NavigationProps) {
	return (
		<NavigationContainer linking={LinkingConfiguration} ref={navRef}>
			<RootNavigator />
		</NavigationContainer>
	);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Root'
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='SaveExpense'
				component={SaveExpenseScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Notifications'
				component={NotificationsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Business'
				component={BusinessScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Billing'
				component={BillingScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='SecurityAndPassword'
				component={SecurityAndPasswordScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='ChangePassword'
				component={ChangePasswordScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='ForgotPassword'
				component={ForgotPasswordScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='VerifyResetPasswordCode'
				component={VerifyResetPasswordCodeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='ResetPassword'
				component={ResetPasswordScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const screens: ScreensProps[] = [
	{
		name: 'Home',
		screen: HomeScreen,
		iconActive: require('@/assets/icons/tab-bar/home-active.png'),
		iconInactive: require('@/assets/icons/tab-bar/home.png')
	},
	{
		name: 'Expenses',
		screen: ExpensesScreen,
		iconActive: require('@/assets/icons/tab-bar/expenses-active.png'),
		iconInactive: require('@/assets/icons/tab-bar/expenses.png')
	},
	{
		name: 'Token',
		screen: TokenOtpScreen,
		iconActive: require('@/assets/icons/tab-bar/token-active.png'),
		iconInactive: require('@/assets/icons/tab-bar/token.png')
	},
	{
		name: 'Config',
		screen: ConfigScreen,
		iconActive: require('@/assets/icons/tab-bar/menu-active.png'),
		iconInactive: require('@/assets/icons/tab-bar/menu.png')
	},
];
function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: 20,
					left: 20,
					right: 20,
					borderRadius: 50,
					backgroundColor: Colors.BgCard,
					height: 60,
					paddingBottom: 0,
					borderTopWidth: 0
				},
				tabBarShowLabel: false
			}}
		>
			{screens
				.map(({ name, iconActive, iconInactive, screen }, index) => (
					<BottomTab.Screen
						key={'tab-' + index}
						name={name}
						component={screen}
						options={{
							tabBarIcon: ({ focused }) => (
								<Image
									source={focused ? iconActive : iconInactive}
									style={{ width: 32, height: 32 }}
								/>
							)
						}}
					/>
				))
			}
		</BottomTab.Navigator>
	)
}


interface ScreensProps {
	name: keyof RootTabParamList;
	screen: any;
	iconActive: ImageSourcePropType;
	iconInactive: ImageSourcePropType;
}