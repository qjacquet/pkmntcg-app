import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { getCardDetails } from '../api/cards.api'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class CardDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      card: undefined,
      isLoading: false
    }

    //this._toggleFavorite = this._toggleFavorite.bind(this)
    this._shareCard = this._shareCard.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareCard: this._shareCard,
      card: this.state.card
    })
  }

  componentDidMount() {
   //  const favoriteCardIndex = this.props.favoritesCard.findIndex(item => item.id === this.props.navigation.state.params.idCard)
   //  if (favoriteCardIndex !== -1) {
   //    this.setState({
   //      card: this.props.favoritesCard[favoriteCardIndex]
   //    }, () => { this._updateNavigationParams() })
   //    return
	//  }
	 this.setState({ isLoading: true })
    getCardDetails(this.props.navigation.state.params.id).then(data => {
      this.setState({
        card: data.cards[0],
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
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

//   _toggleFavorite() {
//     const action = { type: "TOGGLE_FAVORITE", value: this.state.card }
//     this.props.dispatch(action)
//   }

//   _displayFavoriteImage() {
//     var sourceImage = require('../Images/ic_favorite_border.png')
//     var shouldEnlarge = false // Par d�faut, si le card n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge � true
//     if (this.props.favoritesCard.findIndex(item => item.id === this.state.card.id) !== -1) {
//       sourceImage = require('../Images/ic_favorite.png')
//       shouldEnlarge = true // Si le card est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se r�tr�cisse => shouldEnlarge � false
//     }
//     return (
//       <EnlargeShrink
//         shouldEnlarge={shouldEnlarge}>
//         <Image
//           style={styles.favorite_image}
//           source={sourceImage}
//         />
//       </EnlargeShrink>
//     )
//   }

  _displayCard() {
    const { card } = this.state
    if (card != undefined) {
      return (
        <ScrollView 
            style={styles.scrollview_container}>
            <View style={styles.image_container}>
                <Image
                    style={styles.image}
                    source={{uri: card.imageUrl}}
                />
            </View>
          <Text style={styles.title_text}>{card.name}</Text>
          {/* <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity> */}
          <Text style={styles.default_text}>Extension : {card.set}</Text>
          <Text style={styles.default_text}>Numéro : {card.number}</Text>
          <Text style={styles.default_text}>Rareté : {card.rarity}</Text>
          <Text style={styles.default_text}>Artiste : {card.artist}</Text>
        </ScrollView>
      )
    }
  }

  _shareCard() {
    const { card } = this.state
    Share.share({ title: card.title, message: card.overview })
  }

  _displayFloatingActionButton() {
    const { card } = this.state
    if (card != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareCard()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayCard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 10,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image_container :{
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {
	selectedCards: state.toggleCard.selectedCards,
	collection: state.collection.cards
  }
}

export default CardDetail