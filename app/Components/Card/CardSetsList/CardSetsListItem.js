import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { getCardsFromCardSet } from '../../../Api/cards.api'


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
		this._getCountOfUniqueCardsBySet = this._getCountOfUniqueCardsBySet.bind(this)
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
	 
	 _getCountOfUniqueCardsBySet(setcode) {
		const uniqueCardsCollection = this.props.collection.reduce((acc, current) => {
			const x = acc.find(item => item.id === current.id);
			if (!x) {
			  return acc.concat([current]);
			} else {
			  return acc;
			}
		}, []);
		var count = 0
		for(var i = 0; i < uniqueCardsCollection.length; ++i) {
			 if(uniqueCardsCollection[i].setCode == setcode)
				count++
		}
		return count
	} 

	_getCompletionPercentage(count, total) {
		return numeral(count / total).format('0%');
	} 

	_isComplete(count, total) {
		return count == total
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
	 let count = this._getCountOfUniqueCardsBySet(cardSet.code)
	 let total = cardSet.totalCards
	 let percentage = this._getCompletionPercentage(count, total)
    return (
    <TouchableOpacity onPress={() => { this._displayCardList(cardSet) }}>
        <ListItem
        title={cardSet.name}
        subtitle={
          <View style={styles.subtitleView}>
				<Text>{count} / {total} ({percentage})</Text>
				{
					this._isComplete(count, total) && 
					<Icon style={styles.sectionCountIcon} color="#fdd835" name="star"/>
				}
          </View>
        }
        leftAvatar={{
            source: cardSet.symbolUrl && { uri: cardSet.symbolUrl },
            overlayContainerStyle:{backgroundColor: 'white'}
        }}
      />
    </TouchableOpacity>
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
		  justifyContent: 'space-between'
      }
})

const mapStateToProps = (state) => {
	return {
		selectedCards: state.toggleCard.selectedCards,
		collection: state.collection.cards
	}
}

export default connect(mapStateToProps)(CardSetsListItem)