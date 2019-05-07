import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CardSearch from '../components/CardSearch';
import CardSetsList from '../components/CardSetsList/CardSetsList';
import CardList from '../components/CardList/CardList';

const HomeStack = createStackNavigator({
	Home: {
		screen: CardSearch,
		navigationOptions: {
			title: 'Recherche',
		},
	}
})

const CardSetsStackNavigator = createStackNavigator({
	CardSetsList: {
	  screen: CardSetsList,
	  navigationOptions: {
		 title: 'Extensions'
	  }
	},
	CardList: {
		screen: CardList
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
  HomeStack,
  CardSetsStackNavigator
});
