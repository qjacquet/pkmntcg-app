import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { getCardDetails } from '../api/cards.api'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class CardDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state
      if (params.card != undefined && Platform.OS === 'ios') {
        return {
            headerRight: <TouchableOpacity
                            style={styles.share_touchable_headerrightbutton}
                            onPress={() => params.shareCard()}>
                            <Image
                              style={styles.share_image}
                              source={require('../Images/ic_share.png')} />
                          </TouchableOpacity>
        }
      }
  }

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
	console.log(this.props.navigation.state.params.id)
	 this.setState({ isLoading: true })
    getCardDetails(this.props.navigation.state.params.id).then(data => {
      this.setState({
        card: data,
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
//     var shouldEnlarge = false // Par défaut, si le card n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
//     if (this.props.favoritesCard.findIndex(item => item.id === this.state.card.id) !== -1) {
//       sourceImage = require('../Images/ic_favorite.png')
//       shouldEnlarge = true // Si le card est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
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
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(card.backdrop_path)}}
          />
          <Text style={styles.title_text}>{card.title}</Text>
          {/* <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity> */}
          <Text style={styles.description_text}>{card.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(card.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {card.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {card.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(card.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {card.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {card.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
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
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
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
  image: {
    height: 169,
    margin: 5
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
    favoritesCard: state.toggleFavorite.favoritesCard
  }
}

export default CardDetail