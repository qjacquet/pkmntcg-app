import React from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native'
import CardItem from '../CardItem'
import { connect } from 'react-redux'
import { getCards } from '../../api/cards.api'

class CardList extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      cards: [],
      cardFilter: undefined,
      isLoading: false
   }
   this._loadCards = this._loadCards.bind(this)
  }

  componentDidMount() {
		if (this.props.navigation.state.params.filter != undefined) {
			this.setState({
        cardFilter: this.props.navigation.state.params.cardFilter
			}, () => {
        this._loadCards()
      })
		}
  } 
  
  _loadCards(){
    this.setState({ isLoading: true })
    getCards(this.state.cardFilter, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
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
    console.log((this.state.cards[0]))
    return (
      <View>
        <FlatList
          style={styles.list}
          data={this.state.cards}
          extraData={this.state}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CardItem
              card={item}
              displayDetailForCard={this._displayDetailForCard}
            />
			    )}
          numColumns={3}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadCards()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
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