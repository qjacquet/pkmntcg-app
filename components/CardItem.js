import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, CheckBox } from 'react-native'
import moment from 'moment'
import FadeIn from '../Animation/FadeIn'

class CardItem extends React.Component {

	constructor(props) {
		super(props)
		this.page = 0
		this.nextPage = 0
		this.state = {
		  selectedIds: [],
		  isLoading: false
	  }
	  this._toggleCheckbox = this._toggleCheckbox.bind(this)
	}

	_toggleCheckbox(id) {
		const selectedIds = {...this.state.selectedIds}
		if (selectedIds[id]) {
			selectedIds[id] = false;
		}
		else {
			selectedIds[id] = true;
		}
		this.setState({ selectedIds: selectedIds });
	}

	_displayCheckbox(selectModeEnabled, id){
		if (selectModeEnabled) {
			return (
				<View>
				  	<CheckBox 
						style={styles.checkbox}
						value = { this.state.selectedIds[id] }
						onChange = {() => this._toggleCheckbox(id)}
					/>
				</View>
			 )
		}
	}

  render() {
	 const { card, displayDetailForCard, selectModeEnabled } = this.props
    return (
      <View>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForCard(card.id)}>
          <Image
            style={styles.image}
            source={{uri: card.imageUrl}}
          />
        </TouchableOpacity>
		  {this._displayCheckbox(selectModeEnabled, card.id)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  checkbox: {
	  position: 'absolute'
  }
})

export default CardItem