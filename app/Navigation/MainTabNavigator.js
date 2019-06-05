import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import CollectionScreen from '../Screens/CollectionScreen'
import DeckScreen from '../Screens/DeckScreen'

import TabBarIcon from '../Components/TabBarIcon'
import CardSearch from '../Components/Cards/CardSearch'
import CardDetails from '../Components/Cards/CardList/CardDetails'
import CardSetsList from '../Components/Cards/CardSetsList/CardSetsList'
import CardModal from '../Components/Cards/CardList/CardModal'
import CardList from '../Components/Cards/CardList/CardList'

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

const CollectionStack = createStackNavigator({
    CollectionScreen: {
        screen: CollectionScreen,
        navigationOptions: {
            title: 'Collection'
        }
    },
    CardDetails: {
        screen: CardDetails
    },
    CardSetsList: {
        screen: CardDetails
    },
    CardList: {
        screen: CardList
	 },
	 CardModal: {
		screen: CardModal
  	 }
})

const DeckStack = createStackNavigator({
    DeckScreen: {
        screen: DeckScreen,
        navigationOptions: {
            title: 'Decks'
        }
    }
})

CollectionStack.navigationOptions = {
    tabBarLabel: 'Collection',
};

HomeStack.navigationOptions = {
    tabBarLabel: 'Accueil',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    ),
};

DeckStack.navigationOptions = {
    tabBarLabel: 'Decks',
};

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createBottomTabNavigator({
    CollectionStack,
    HomeStack,
    DeckStack
});
