import React from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator, Text, Dimensions } from 'react-native'
import CardItem from '../CardItem'
import { connect } from 'react-redux'
import { getAllCards } from '../../api/cards.api'

class CardList extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      title: params.screenTitle || 'Liste des cartes',
    };
  }

  constructor(props) {
    super(props)
    this.page = 0
    this.nextPage = 0
    this.state = {
      cards: [],
		cardFilter: undefined,
		selectModeEnabled: false,
      isLoading: false
   }
	this._loadCards = this._loadCards.bind(this)
	this.screenWidth = Dimensions.width;
  }

  componentDidMount() {
		if (this.props.navigation.state.params != undefined) {
			this.setState({
				cardFilter: this.props.navigation.state.params.filter || "" // filtre contenant les paramètres pour l'url de l'api... à améliorer
			}, () => {
				this._loadCards()
			})
			this.setState({
				selectModeEnabled: this.props.navigation.state.params.selectModeEnabled || this.props.selectModeEnabled || false	//  force ou non le mode "séléction" depuis l'écran appelant 
			})
		}
		else {
			this.setState({
				cardFilter: this.props.filter || "" // filtre contenant les paramètres pour l'url de l'api... à améliorer
			}, () => {
				this._loadCards()
			})

			this.setState({
				selectModeEnabled: this.props.selectModeEnabled || false	//  force ou non le mode "séléction" depuis l'écran appelant 
			})
		}
  }

  _toggleSelectMode(){
		this.setState({
			selectModeEnabled: !this.state.selectModeEnabled
		})
  }

  _loadCards() {
		if (this.state.cardFilter == "") {
			return null
		}
		this.setState({ isLoading: true })
		getAllCards(this.state.cardFilter).then(data => {
			// Order by number
			var cards = data.cards.sort(function(a, b) { return a.number - b.number }) 
			this.setState({
				cards: [ 
					...this.state.cards, 
					...cards
				],
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
	  //console.log(this.state.selectModeEnabled)
    return (
        <FlatList
          style={styles.list}
          data={this.props.cards || this.state.cards}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <CardItem
				  selectModeEnabled = {this.state.selectModeEnabled}
              card={item}
              displayDetailForCard={this._displayDetailForCard}
            />
			    )}
          numColumns={3}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
              //this._loadCards()
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