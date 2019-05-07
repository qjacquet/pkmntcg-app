import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import moment from 'moment'
import { getCardsFromCardSet } from '../../api/cards.api'

class CardSetsListItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		  cards: [],
		  filter: undefined,
		  isLoading: false
		}
		this._loadCardsFromCardSet = this._loadCardsFromCardSet.bind(this)
		this._displayCardList = this._displayCardList.bind(this)
	 }

	_loadCardsFromCardSet(codeSet) {
		this.setState({ isLoading: true })
		getCardsFromCardSet(codeSet).then(data => {
				this.setState({
					cards: [ ...this.state.cards, ...data.cards ],
					isLoading: false
				}, function () {
					this.props.navigation.navigate('CardList', {cards: this.state.cards})
			  })
		})
	}

	_displayCardList(setCode){
		this.props.navigation.navigate('CardList', {filter: { setCode: setCode}})
	}

  render() {
	 const { cardSet } = this.props
    return (
      <View>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => { this._displayCardList(cardSet.code) }}>
          <Image
            style={styles.image}
            source={{uri: cardSet.logoUrl}}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		flexDirection: 'row',
		height: 100,
		width: (Dimensions.get('window').width / 2),
		padding: 10
	 },
	 image: {
		flex: 1,
		width: 100,
		height: 100,
		resizeMode: 'contain'

	 }
})

export default CardSetsListItem