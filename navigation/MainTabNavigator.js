import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CardSearch from '../components/CardSearch';

const HomeStack = createStackNavigator({
	Home: {
		screen: CardSearch,
		navigationOptions: {
			title: 'Recherche',
		},
	}
})
 
 HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
	  <TabBarIcon
		 focused={focused}
		 name={
			Platform.OS === 'ios'
			  ? `ios-information-circle${focused ? '' : '-outline'}`
			  : 'md-information-circle'
		 }
	  />
	),
 };

export default createBottomTabNavigator({
  HomeStack
});
