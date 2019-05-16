import React from 'react'
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getCardSetsStandard } from '../api/cards.api'

class CardSetList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cardSets: [],
      isLoading: false
    }
  }

  _toggleCardSet(cardSetCode) {
    const action = { type: "TOGGLE_CARDSET", value: cardSetCode }
    this.props.dispatch(action)
  }

  componentDidMount() {
    getCardSetsStandard().then(data => {
      this.setState({
        cardSets: data.sets
      })
    })
  }

  render() {
    if (this.state.cardSets.length == 0){
      return null
    }
    return (
      <View style={styles.list}>
        <FlatList
          data={this.state.cardSets}
          horizontal={true}
          keyExtractor={(item) => item.code.toString()}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity
              onPress={() => { this._toggleCardSet() }}>
              <Image
                style={styles.image}
                source={{uri: item.symbolUrl}}
              />
            </TouchableOpacity>
          </View>
			    )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    height: 50
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  },
})

const mapStateToProps = (state) => {
  return {
    selectedSets: state.cardSearchFilter.selectedSets
  }
}

export default (CardSetList)