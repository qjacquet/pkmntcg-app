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
			selectedCardCondition: "Bon",
			selectedCardQuantity: 0
		}

		this.toggle = this.toggle.bind(this)
		this._save = this._save.bind(this)
		//this._displayAllCollectedCardWithTypes = this._displayAllCollectedCardWithTypes.bind(this)
	}

	_getDataFormated(data) {
		return data.reduce((acc, item) => {
			const foundIndex = acc.findIndex(element => element.key === item.type);
			if (foundIndex === -1) {
			  return [
				 ...acc, 
				 {
					key: item.type,
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
				selectedCardType: "normal",
				selectedCardCondition: "Bon",
				selectedCardQuantity: 0
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
			var collectionData = {
				type: this.state.selectedCardType,
				condition: this.state.selectedCardCondition,
				quantity: this.state.selectedCardQuantity
			}
				
			let action = { type: actionType, card: card, collectionData: collectionData}
			this.props.dispatch(action)
		}
	}

	_isCollected(id) {
		if (this.props.collection.findIndex(item => item.id == id) !== -1) {
			return true
		}
		return false
	}

	_getAllCardsCollectedCount(id) {
		return this._getCollectionData(id).length
	}

	_getCollectionData(id) {
		const cardIndex = this.props.collection.findIndex(item => item.id == id)
		if (cardIndex !== -1)
		{
			return this.props.collection[cardIndex].collectionData
		}
		return null
	}

	_displayAllCollectedCardWithTypes(id) {
		const list = this._getCollectionData(id)
		if (list == null) {
			return <View></View>
		}
		return (
			<SectionList
				sections={this._getDataFormated(list)}
				renderSectionHeader={this._renderSection}
				renderItem={({ item }) => (
					<View>
						<Text>Condition : {item.condition} - Quantity : {item.quantity}</Text>
					</View>
				)}
				keyExtractor={(item, index) => 'key'+index}
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
						<Image
							style={styles.image}
							source={{ uri: card.imageUrl }}
						/>
						{selectModeEnabled &&
						<View>
							
							{/* Qte */}
							<Text>Quantity</Text>
							<Input
								keyboardType="numeric"
								maxLength = {2}
								onChangeText={(value) =>
									this.setState({selectedCardQuantity: value})
								}
							/>
							{/* Type */}
							<Text>Type</Text>
							<Picker
								selectedValue={this.state.selectedCardType}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardType: itemValue})
								}>
								<Picker.Item label="Normal" value="normal" />
								<Picker.Item label="Foil" value="foil" />
							</Picker>
							{/* State */}
							<Text>Condition</Text>
							<Picker
								selectedValue={this.state.selectedCardCondition}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({selectedCardCondition: itemValue})
								}>
								<Picker.Item label="Excellent" value="excellent" />
								<Picker.Item label="Good" value="good" />
								<Picker.Item label="Poor" value="poor" />
							</Picker>
						</View>
						}
						{/* Detail de collection */}
						{isCollected && <Text> Exemplaires </Text>}
						{isCollected && this._displayAllCollectedCardWithTypes(card.id)}
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