import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CardItem from './CardItem'
import { connect } from 'react-redux'

class CardList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  _displayDetailForCard = (idCard) => {
    this.props.navigation.navigate('CardDetail', {idCard: idCard})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CardItem
          card={item}
          id={item.id.toString()}
				  displayDetailForCard={this._displayDetailForCard}
            />
			    )}
			    numColumns={3}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props.loadCards()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
  }
}

export default CardList