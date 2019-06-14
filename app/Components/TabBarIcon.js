import React from 'react';
import { View } from 'react-native'
import { Icon } from 'expo';

export default class TabBarIcon extends React.Component {
  render() {
	if (this.props.isMainTab) {
		return (
			<View style={{
				height: 80,
				width: 80,
				borderRadius: 100,
				backgroundColor: this.props.color,
				paddingTop: 15,
				justiftyContent:"center", 
				alignItems:"center"}}>
				<Icon.Ionicons name={this.props.name} size={45}/>
			</View>
		 );
	 }
	 else {
		return (
			<Icon.Ionicons
			  name={this.props.name}
			  size={26}
			/>
		 );
	 }
  }
}