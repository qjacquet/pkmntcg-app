import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, CheckBox } from 'react-native'
import moment from 'moment'
import FadeIn from '../Animation/FadeIn'
import { connect } from 'react-redux'

class CardItem extends React.Component {

	constructor(props) {
		super(props)
		this.page = 0
		this.nextPage = 0
		this.state = {
			selectedIds: [],
			isLoading: false
		}
		this._toggleCard = this._toggleCard.bind(this)
	}

	_toggleCard(card) {
		const action = { type: "TOGGLE_CARD", value: card }
		this.props.dispatch(action)
	}

	_isSelected(id) {
		if (this.props.selectedCards.findIndex(item => item.id === id) != -1) {
			return true;
		}
		return false;
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
						source={{ uri: card.imageUrl }}
					/>
				</TouchableOpacity>
				{selectModeEnabled &&
					<CheckBox
						style={styles.checkbox}
						value={this._isSelected(card.id)}
						onChange={() => this._toggleCard(card)}
					/>
				}
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

const mapStateToProps = (state) => {
	return {
		selectedCards: state.toggleCard.selectedCards
	}
}

export default connect(mapStateToProps)(CardItem)