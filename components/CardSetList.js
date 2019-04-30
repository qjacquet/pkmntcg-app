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

  componentDidMount() {
    getCardSetsStandard().then(data => {
      this.setState({
        cardSets: data.sets
      })
    })
  }

  render() {    
    console.log(this.state.cardSets)
    if (this.state.cardSets.length == 0){
      return null
    }
    return (
        <FlatList
          data={this.state.cardSets}
          keyExtractor={(item) => item.code.toString()}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity
              onPress={() => {}}>
              <Text>{item.name}</Text>
              <Image
                style={styles.image}
                source={{uri: item.symbolUrl}}
              />
            </TouchableOpacity>
          </View>
			    )}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  },
})

const mapStateToProps = state => {
  return {
  }
}

export default CardSetList