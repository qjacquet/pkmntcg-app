import React from 'react'
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity, Picker, SectionList } from 'react-native'
import { Overlay, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'expo';

class CardModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			card: undefined,
			selectedCardType: "normal",
			selectedCardCondition: "",
			selectedCardQuantity: 0
		}

		this.toggle = this.toggle.bind(this)
		this._save = this._save.bind(this)
	}

	_getDataFormated(data) {
		return data.reduce((acc, item) => {
			const foundIndex = acc.findIndex(element => element.key === item.collectionData.type);
			if (foundIndex === -1) {
			  return [
				 ...acc, 
				 {
					key: item.collectionData.type,
					data: [item],
				 },
			  ];
			}
			acc[foundIndex].data = [...acc[foundIndex].data, item];
			return acc;
		 }, []);
	 }

	toggle = (card) => {
		if (!this.state.visible) {
			this.setState({
				visible: !this.state.visible,
				card: card,
				selectedCardType: card.collectionData ? card.collectionData.type : "normal",
				selectedCardCondition: card.collectionData ? card.collectionData.condition : "",
				selectedCardQuantity: card.collectionData ? card.collectionData.quantity : 0
			}, () => {

			});
		}
		else {
			this._save(this.state.card, "ADD")
			this.setState({
				visible: !this.state.visible
			});
		}
	}

	_save(card, actionType) {
		if (this.state.selectedCardQuantity > 0)
		{
			let collectionData = {
				type: this.state.selectedCardType,
				condition: this.state.selectedCardCondition
			}

			card.collectionData = collectionData
		}

		let action = { type: actionType, value: card, quantity: this.state.selectedCardQuantity}
		this.props.dispatch(action)
	}

	_isCollected(id) {
		if (this._getAllCardsCollectedCount(id) > 0)
		{
			return true
		}
		return false
	}

	_getAllCardsCollectedCount(id) {
		return this._getAllCardsCollected(id).length
	}

	_getAllCardsCollected(id) {
		return this.props.collection.filter((item, index) => item.id == id)
	}

	// a ameliorer
	_getUniqueCardCollectedCount(list, filter) {
		return list.filter(item => item.type == filter.type && item.condition == filter.condition).length
	}

	_displayAllCollectedCardWithTypes(id) {
		const list = this._getAllCardsCollected(id)
		//console.log(list)
		return (
			<SectionList
				sections={this._getDataFormated(list)}
				renderSectionHeader={this._renderSection}
				renderItem={({ item }) => (
					<View>
						<Text>{item.collectionData.condition}</Text>
						<Text>{this._getUniqueCardCollectedCount(list, {type: item.collectionData.type, condition: item.collectionData.collection})}</Text>
					</View>
				)}
				keyExtractor={(item) => item.id.toString() + '_' + item.collectionData.type.toString()}
			/>
		)
	}

	_renderSection = ({ section }) => {
		return (
			<View>
				<Text>{section.key.toUpperCase()}</Text>
			</View>
		)
	}

	render() {
		const card = this.state.card;

		if (card == undefined) {
			return null;
		}

		const { selectModeEnabled } = this.props;
		let isCollected = this._isCollected(card.id)

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
						{/* <Image
							style={styles.image}
							source={{ uri: card.imageUrl }}
						/> */}
						{selectModeEnabled &&
						<View>
							<Text> Ajouter </Text>
							{/* Qte */}
							<Input
								placeholder='Quantite'
								keyboardType="numeric"
								onChangeText={(value) =>
									this.setState({selectedCardQuantity: value})
								}
							/>
							{/* Type */}
							<Picker
								selectedValue={this.state.selectedCardType}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardType: itemValue})
								}>
								<Picker.Item label="Rarete" value="normal" />
								<Picker.Item label="Normal" value="normal" />
								<Picker.Item label="Foil" value="foil" />
							</Picker>
							{/* State */}
							<Picker
								selectedValue={this.state.selectedCardCondition}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardCondition: itemValue})
								}>
								<Picker.Item label="Etat" value="" />
								<Picker.Item label="Excellent" value="1" />
								<Picker.Item label="Bon" value="2" />
								<Picker.Item label="Moyen" value="3" />
								<Picker.Item label="Mauvais" value="4" />
							</Picker>
						</View>
						}
						{isCollected &&
							<Text> Exemplaires </Text>
						}
						{isCollected &&
						<View>
							{this._displayAllCollectedCardWithTypes(card.id)}
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
		collection: state.collection.cards
	}
}

export default connect(mapStateToProps, null, null, {forwardRef : true})(CardModal)