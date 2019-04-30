import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import CardList from './CardList'
import { getCards } from '../api/cards.api'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      cards: [],
      isLoading: false
    }
    this._loadCards = this._loadCards.bind(this)
  }

  _loadCards() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getCards(1).then(data => {
			console.log(JSON.stringify(data))
          this.page = 1
          //this.totalPages = data.total_pages
          this.setState({
            cards: [ ...this.state.cards, ...data.cards ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchCards() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      cards: [],
    }, () => {
        this._loadCards()
    })
  }

  _displayDetailForCard = (idCard) => {
    console.log("Display card with id " + idCard)
    this.props.navigation.navigate("CardDetail", { idCard: idCard })
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
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du card'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchCards()}
        />
        <Button title='Rechercher' onPress={() => this._searchCards()}/>
        <CardList
          cards={this.state.cards}
          navigation={this.props.navigation}
          loadCards={this._loadCards}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des cards favoris. Et ainsi pouvoir déclencher le chargement de plus de cards lorsque l'utilisateur scrolle.
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
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

export default Search