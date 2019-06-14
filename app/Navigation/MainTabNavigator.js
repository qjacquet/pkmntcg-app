import React from 'react'
import { Platform, StyleSheet, Image, View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import CollectionScreen from '../Screens/CollectionScreen'
import DeckScreen from '../Screens/DeckScreen'
import ChatbotScreen from '../Screens/ChatbotScreen'
import ScanScreen from '../Screens/ScanScreen'

import TabBarIcon from '../Components/TabBarIcon'
import CardSearch from '../Components/Cards/CardSearch'
import CardDetails from '../Components/Cards/CardList/CardDetails'
import CardSetsList from '../Components/Cards/CardSetsList/CardSetsList'
import CardModal from '../Components/Cards/CardList/CardModal'
import CardList from '../Components/Cards/CardList/CardList'

import TabBarMainButton from '../Components/TabBarMainButton'

/**
 * Déclaration des menu de navigation
 */
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

const ChatbotStack = createStackNavigator({
	ChatbotScreen: {
		 screen: ChatbotScreen,
		 navigationOptions: {
			  title: 'Chatbot'
		 }
	}
})

const ScanStack = createStackNavigator({
	ScanScreen: {
		 screen: ScanScreen,
		 navigationOptions: {
			  title: 'Scan'
		 }
	}
})

/**
 * Paramétrage des menus
 */

CollectionStack.navigationOptions = {
	tabBarLabel: '',
	tabBarOptions: { showIcon: true, showLabel: false },
    tabBarIcon: ({ tintColor }) => (
		<Image
		source={require('../Images/switchIcon.png')}
		style={styles.icon}/>
	 )
};

HomeStack.navigationOptions = {
	tabBarLabel: '',
	tabBarOptions: { showIcon: true, showLabel: false },
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

import decksIcon from '../Images/decksIcon.png';
DeckStack.navigationOptions = {
	 tabBarLabel: '',
	 tabBarOptions: { showIcon: true, showLabel: false },
    tabBarIcon: ({ tintColor }) => (
		<Image
			source={decksIcon}
			style={styles.icon}/>
    )
};

ChatbotStack.navigationOptions = {
	tabBarLabel: '',
	tabBarOptions: { showIcon: true, showLabel: false },
	tabBarIcon: ({ focused }) => (
		 <TabBarIcon
			  focused={focused}
			  name={
					Platform.OS === 'ios'
						 ? 'ios-chatbubbles'
						 : 'md-chatbubbles'
			  }
		 />
	),
};

ScanStack.navigationOptions = {
	tabBarLabel: '',
	tabBarOptions: { showIcon: true, showLabel: false },
	tabBarIcon: ({ focused }) => (
		 <TabBarIcon
			  isMainTab={true}
			  color={"#f2f2f2"}
			  focused={focused}
			  name={
					Platform.OS === 'ios'
						 ? 'ios-qr-scanner'
						 : 'md-qr-scanner'
			  }
		 />
	),
};

// ScanStack.navigationOptions = {
// 	tabBarLabel: '',
// 	tabBarOptions: { showIcon: true, showLabel: false },
// 	tabBarIcon: ({ focused }) => (
// 		 <TabBarIcon
// 			  focused={focused}
// 			  name={
// 					Platform.OS === 'ios'
// 						 ? 'ios-qr-scanner'
// 						 : 'md-qr-scanner'
// 			  }
// 		 />
// 	),
// };

const styles = StyleSheet.create({
    icon: {
        width: 26,
		  height: 26,
		  justifyContent: 'center', 
		  alignItems: 'center'
    }
})

export default createBottomTabNavigator({
	 HomeStack,
	 CollectionStack,
	 ScanStack,
	 DeckStack,
	 ChatbotStack
}, {
	tabBarOptions: {
	  activeTintColor: '#84E1BF',
	  inactiveTintColor: 'white',
	  labelStyle: {
		 fontSize: 12
	  },
	  style: {
		 backgroundColor: '#f2f2f2'
	  },
	  showLabel: false
	}
 });