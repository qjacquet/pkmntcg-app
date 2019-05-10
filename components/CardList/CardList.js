import React from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator, Text, Dimensions } from 'react-native'
import CardItem from '../CardItem'
import { connect } from 'react-redux'
import { getCards } from '../../api/cards.api'

class CardList extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.nextPage = 0
    this.state = {
      cards: [],
      cardFilter: undefined,
      isLoading: false
   }
	this._loadCards = this._loadCards.bind(this)
	this.screenWidth = Dimensions.width;
  }

  componentDidMount() {
		if (this.props.navigation.state.params.filter != undefined) {
			console.log(this.props.navigation.state.params.filter)
			this.setState({
        		cardFilter: this.props.navigation.state.params.filter
			}, () => {
        this._loadCards()
      })
		}
  } 

  _loadCards(){
    this.setState({ isLoading: true })
    getCards(this.state.cardFilter, this.page+1).then(data => {
		  this.page = data.page
		  console.log(data.page)
        this.nextPage = data.nextPage
        this.setState({
          cards: [ ...this.state.cards, ...data.cards ],
          isLoading: false
        })
    })
  }

  _displayDetailForCard = (idCard) => {
    this.props.navigation.navigate('CardDetail', {idCard: idCard})
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.state.cards}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <CardItem
              card={item}
              displayDetailForCard={this._displayDetailForCard}
            />
			    )}
          numColumns={3}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.nextPage) {
              this._loadCards()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
	 flex: 1,
	 width: this.screenWidth
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
  }
}

export default CardList