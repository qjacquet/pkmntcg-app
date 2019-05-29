import React from 'react'
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity, Picker } from 'react-native'
import { Overlay, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'expo';

class CardModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			card: undefined,
			selectedCardType: "",
			selectedCardState: "",
			selectedCardQuantity: 0
		}

		this.toggle = this.toggle.bind(this)
		this._getCardCount = this._getCardCount.bind(this)
	}

	toggle = (card) => {
		if (!this.state.visible) {
			this.setState({
				visible: !this.state.visible,
				card: card
			});
		}
		else {
			this._save(this.state.card)
			this.setState({
				visible: !this.state.visible,
				card: undefined
			});
		}
	}

	_save(card) {
		let action = undefined

		let collection = {
			rarity: this.state.selectedCardType,
			state: this.state.selectedCardState,
			quantity: this.state.selectedCardQuantity
		}

		// // Si on ajoute ou modifie
		// if (this.state.selectedCardQuantity > 0)
		// {

		// }
		// // Si on supprime
		// else {
			
		// }

		// Si l'élément n'est pas défini, on l'initialise
		if (card.collection == undefined){
			card.collection = [collection]
		}
		else {
			let searchedRarityIndex = card.collection.findIndex(item => item.rarity === collection.rarity)
			// Si l'élément est déjà présent, on l'actualise
			if (searchedRarityIndex !== -1) {
				card.collection[searchedRarityIndex] = collection
				
			}
			// Sinon on l'ajoute
			else {
				card.collection.push(collection)
			}
		}

		action = { type: "UPSERT", value: card }

		this.props.dispatch(action)
	}

	_isSelected(id) {
		if (this.props.collection.findIndex(item => item.id === id) != -1) {
			return true;
		}
		return false;
	}

	_getCardCount(id) {
		const cardIndex = this.props.collection.findIndex(item => item.id === id)
		if (cardIndex === -1) {
			return 0
		}
		return this.props.collection[cardIndex].quantity;
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
					{/* Header */}
					<View style={styles.header}>
						<Text>{card.name}</Text>
					</View>

					{/* Content */}
					<View style={styles.content}>
						{/* Image */}
						<Image
							style={styles.image}
							source={{ uri: card.imageUrl }}
						/>
						{selectModeEnabled &&
						<View>
							{/* Qte */}
							<Input
								placeholder='Quantite'
								keyboardType="numeric"
								onChangeText={(value) =>
									this.setState({selectedCardQuantity: value})
								}
							/>
							{/* Rarity */}
							<Picker
								selectedValue={this.state.selectedCardType}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardType: itemValue})
								}>
								<Picker.Item label="Rarete" value="" />
								<Picker.Item label="Normal" value="normal" />
								<Picker.Item label="Foil" value="foil" />
							</Picker>
							{/* State */}
							<Picker
								selectedValue={this.state.selectedCardState}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardState: itemValue})
								}>
								<Picker.Item label="Etat" value="" />
								<Picker.Item label="Excellent" value="1" />
								<Picker.Item label="Bon" value="2" />
								<Picker.Item label="Moyen" value="3" />
								<Picker.Item label="Mauvais" value="4" />
							</Picker>
						</View>
						}
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						{selectModeEnabled &&
						<View>
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
		flex: 10,
	},
	footer: {
		flex: 1,
	},
	image: {
		flex: 2,
		width: 300,
		height: 300,
		resizeMode: 'contain'
	},

})

const mapStateToProps = state => {
	return {
		selectedCards: state.toggleCard.selectedCards,
		collection: state.collection.cards
	}
}

export default connect(mapStateToProps, null, null, {forwardRef : true})(CardModal)