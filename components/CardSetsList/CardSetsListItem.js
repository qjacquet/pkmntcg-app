import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
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

	_displayCardList(cardSet){
		this.props.navigation.navigate('CardList', {
			filter: "&setCode=" + cardSet.code,
            screenTitle: cardSet.name,
            selectModeEnabled: this.props.selectModeEnabled
		})
    }
    
    _oldRender() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => { this._displayCardList(cardSet) }}>
                    <Image
                        style={styles.image}
                        source={{ uri: cardSet.logoUrl }}
                    />
                </TouchableOpacity>
                <View style={styles.item_info_text}>

                    <Text>Hello ! </Text>

                </View>
            </View>
        )
    }

  render() {
	 const { cardSet } = this.props
    return (
    <TouchableOpacity onPress={() => { this._displayCardList(cardSet) }}>
        <ListItem
        title={cardSet.name}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>0 / {cardSet.totalCards}</Text>
          </View>
        }
        leftAvatar={{
            source: cardSet.symbolUrl && { uri: cardSet.symbolUrl },
            overlayContainerStyle:{backgroundColor: 'white'}
        }}
      />
    </TouchableOpacity>

  
    //   <View>
    //   <TouchableOpacity
    //     style={styles.main_container}
    //     onPress={() => { this._displayCardList(cardSet) }}>
    //     <Image
    //       style={styles.image}
    //       source={{uri: cardSet.logoUrl}}
    //     />
    //   </TouchableOpacity>
    //   <View style={styles.item_info_text}>

    //       <Text>Hello ! </Text>

    //   </View>
    // </View>

    )
  }
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		flexDirection: 'row',
		width: (Dimensions.get('window').width / 2),
     },
     title: {
        textAlign: "center"
     },
	 image: {
		flex: 1,
		width: 100,
		height: 100,
		resizeMode: 'contain'
     },
     item_info_container: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width:"100%"
    },

    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      }
})

export default CardSetsListItem