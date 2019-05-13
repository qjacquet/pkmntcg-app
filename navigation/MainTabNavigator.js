import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CardSearch from '../components/CardSearch';
import CardDetails from '../components/CardDetails';
import CardSetsList from '../components/CardSetsList/CardSetsList';
import CardList from '../components/CardList/CardList';

const HomeStack = createStackNavigator({
	Home: {
		screen: CardSearch,
		navigationOptions: {
			title: 'Recherche',
		},
	},
	CardDetails: {
		screen: CardDetails
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
	},
	CardDetails: {
		screen: CardDetails
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
