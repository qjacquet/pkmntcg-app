import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';

class ChatbotScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
		messages: [
		{
			_id: 1,
			text: `Hi! I am the FAQ bot ?? from Jscrambler.\n\nHow may I help you with today?`,
			createdAt: new Date(),
			user: {
				_id: 2,
				name: 'FAQ Bot',
				avatar: 'https://i.imgur.com/7k12EPD.png'
			}
		}
		]
 	};

 onSend(messages = []) {
	this.setState(previousState => ({
	  messages: GiftedChat.append(previousState.messages, messages)
	}));
 }

 render() {
	return (
	  <View style={{ flex: 1, backgroundColor: '#fff' }}>
		 <GiftedChat
			messages={this.state.messages}
			onSend={messages => this.onSend(messages)}
			user={{
			  _id: 1
			}}
		 />
	  </View>
	);
 }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default ChatbotScreen