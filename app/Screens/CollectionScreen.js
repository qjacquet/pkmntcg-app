import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CardList from '../Components/Cards/CardList/CardList'
import CardSetsList from '../Components/Cards/CardSetsList/CardSetsList'
import { getCardSets } from '../Api/cards.api'

class CollectionScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            cardSets: [],
            isLoading: false
        }
        this._getCardSetsFromCollection = this._getCardSetsFromCollection.bind(this)
    }

    componentDidMount() {
        this._getCardSetsFromCollection()
    }

    _getCardSetsFromCollection() {
        this.setState({ isLoading: true })
        getCardSets().then(data => {
			this.setState({
				// Ajout des extensions bien ordon�es par date
				cardSets: data.sets
					.sort(function(a, b) {
						return b.date > a.date;
				 	})
			})
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <CardSetsList
                    cardSets={this.state.cardSets}
                    navigation={this.props.navigation}
                    selectModeEnabled={true}
                    collectionModeEnabled={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
		selectedCards: state.toggleCard.selectedCards,
		collection: state.collection.cards
    }
}

export default connect(mapStateToProps)(CollectionScreen)