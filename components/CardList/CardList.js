import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CardItem from '../CardItem'
import { connect } from 'react-redux'

class CardList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: []
	 }
  }

  	componentDidMount() {
		if (this.props.navigation.state.params.cards != undefined) {
			this.setState({
				cards: this.props.navigation.state.params.cards
			}, () => {})
		}
	} 

  _displayDetailForCard = (idCard) => {
    this.props.navigation.navigate('CardDetail', {idCard: idCard})
  }

  render() {
	if (this.state.cards.length == 0){
		return null
	}
    return (
        <FlatList
          style={styles.list}
          data={this.state.cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CardItem
				  card={item}
				  displayDetailForCard={this._displayDetailForCard}
            />
			 )}
			 numColumns={3}
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