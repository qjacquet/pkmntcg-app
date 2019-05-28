import React from 'react'
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'expo';

class CardModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			card: undefined
		}

		this.toggle = this.toggle.bind(this)

		this._toggleCard = this._toggleCard.bind(this)
		this._addCard = this._addCard.bind(this)
		this._removeCard = this._removeCard.bind(this)
		this._getCardCount = this._getCardCount.bind(this)
	}

	toggle = (card) => {
		this.setState({
			visible: !this.state.visible,
			card: card
		});
	}

	_addCard(card) {
		const action = { type: "ADD_CARD", value: card }
		this.props.dispatch(action)
	}

	_removeCard(card) {
		const action = { type: "REMOVE_CARD", value: card }
		this.props.dispatch(action)
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

	_getCardCount(id) {
		const cardIndex = this.props.selectedCards.findIndex(item => item.id === id)
		if (cardIndex === -1) {
			return 0
		}
		return this.props.selectedCards[cardIndex].quantity;
	}

	render() {
		const card = this.state.card;

		if (card == undefined) {
			return null;
		}

		const { selectModeEnabled } = this.props;

		return (
			<Overlay
				isVisible={this.state.visible}
				onBackdropPress={() => this.toggle()}>
				<View style={styles.container}>
					<Text style={styles.header} >{card.name}</Text>
					<Image
						style={styles.image}
						source={{ uri: card.imageUrl }}
					/>
					<View style={styles.footer}>
						{selectModeEnabled &&
						<View>
							<TouchableOpacity
									onPress={() => this._removeCard(card)}>
									<Icon.Ionicons
										name="md-remove-circle"
										size={30}
										color="red"
									/>
							</TouchableOpacity>

							<Text>{this._getCardCount(card.id)}</Text>

							<TouchableOpacity
									onPress={() => this._addCard(card)}>
									<Icon.Ionicons
										name="md-add-circle"
										size={30}
										color="green"
									/>
							</TouchableOpacity>
						</View>
						}
					</View>
				</View>
			</Overlay>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flex: 1,
	},
	content: {

	},
	footer: {
		flex: 6,
	},
	image: {
		flex: 10,
		resizeMode: 'contain',
	}

})

const mapStateToProps = state => {
	return {
		selectedCards: state.toggleCard.selectedCards
	}
}

export default connect(mapStateToProps, null, null, {forwardRef : true})(CardModal)