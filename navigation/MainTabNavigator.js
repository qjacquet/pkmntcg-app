import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import CollectionScreen from '../screens/CollectionScreen'
import DeckScreen from '../screens/DeckScreen'

import TabBarIcon from '../components/TabBarIcon'
import CardSearch from '../components/CardSearch'
import CardDetails from '../components/CardDetails'
import CardSetsList from '../components/CardSetsList/CardSetsList'
import CardList from '../components/CardList/CardList'

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
