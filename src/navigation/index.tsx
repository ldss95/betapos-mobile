import React, { Ref } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, RootTabParamList } from '@/types/routes';
import LinkingConfiguration from './LinkingConfiguration';

import LoginScreen from '@/screens/Auth/Login';
import HomeScreen from '@/screens/Home';
import ExpensesScreen from '@/screens/Expenses';
import ConfigScreen from '@/screens/Config';

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
		</Stack.Navigator>
	);
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName='Home'
		>
			<BottomTab.Screen
				name='Home'
				component={HomeScreen}
			/>
			<BottomTab.Screen
				name='Expenses'
				component={ExpensesScreen}
			/>
			<BottomTab.Screen
				name='Config'
				component={ConfigScreen}
			/>
		</BottomTab.Navigator>
	)
}
