import React from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator, Text, Dimensions } from 'react-native'
import { Overlay } from 'react-native-elements'
import CardItem from './CardItem'
import { connect } from 'react-redux'
import { getAllCards } from '../../../Api/cards.api'
import CardModal from './CardModal' 

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
				isLoading: false,
				modal: {
					isVisible: false,
					card: undefined
				}
        }
		  this._loadCards = this._loadCards.bind(this)
		  this._displayModal = this._displayModal.bind(this)
		  this._toggleCardModal = this._toggleCardModal.bind(this)

        this.screenWidth = Dimensions.width;
    }

    componentDidMount() {
        if (this.props.navigation.state.params != undefined) {
            this.setState({
                cardFilter: this.props.navigation.state.params.filter || "" // filtre contenant les param�tres pour l'url de l'api... � am�liorer
            }, () => {
                this._loadCards()
            })
            this.setState({
                selectModeEnabled: this.props.navigation.state.params.selectModeEnabled || this.props.selectModeEnabled || false	//  force ou non le mode "s�l�ction" depuis l'�cran appelant 
            })
        }
        else {
            this.setState({
                cardFilter: this.props.filter || "" // filtre contenant les param�tres pour l'url de l'api... � am�liorer
            }, () => {
                this._loadCards()
            })

            this.setState({
                selectModeEnabled: this.props.selectModeEnabled || false	//  force ou non le mode "s�l�ction" depuis l'�cran appelant 
            })
        }
    }

    _displayDetailForCard = (idCard) => {
        this.props.navigation.navigate('CardDetail', { idCard: idCard })
    }

    _toggleSelectMode() {
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
            var cards = data.cards.sort(function (a, b) { return a.number - b.number })
            this.setState({
                cards: [
                    ...this.state.cards,
                    ...cards
                ],
                isLoading: false
            })
        })
    }

    _displayDetailForCard = (id) => {
        this.props.navigation.navigate('CardDetails', { id: id })
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
	 
	_displayModal(){
		return (
			<CardModal 
				ref={ref => {
					this.cardModal = ref;
				}} 
				selectModeEnabled = {this.state.selectModeEnabled}
			 />
		)
	}

	_toggleCardModal = (card) => {
		if(this.cardModal){
		  this.cardModal.toggle(card);
		}
	}

	render() {
		return (
			<View>
				{this._displayModal()}
				<FlatList
					style={styles.list}
					data={this.props.cards || this.state.cards}
					extraData={this.props.collection}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<CardItem
							selectModeEnabled={this.state.selectModeEnabled}
							card={item}
							displayDetailForCard={this._displayDetailForCard}
							toggleCardModal={this._toggleCardModal}
						/>
					)}
					numColumns={3}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						//this._loadCards()
					}}
					removeClippedSubviews={true}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    list: {
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

const mapStateToProps = (state) => {
    return {
		  selectedCards: state.toggleCard.selectedCards,
		  collection: state.collection.cards
    }
}

export default connect(mapStateToProps)(CardList)