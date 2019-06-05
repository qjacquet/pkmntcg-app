import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CardList from '../app/Components/CardList/CardList'
import CardSetsList from '../Components/Cards/CardSetsList/CardSetsList'
import { getCardSets } from '../Api/cards.api'

class CardListScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            cardSets: [],
            isLoading: false
        }
    }

    componentDidMount() {

	 }
	 
    render() {
        return (
            <View style={styles.main_container}>
                <CardList
						
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

export default connect(mapStateToProps)(CardListScreen)