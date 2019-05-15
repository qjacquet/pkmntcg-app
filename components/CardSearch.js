import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import CardList from './CardList/CardList'
import CardSetList from './CardSetList'
import { getAllCards } from '../api/cards.api'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.filter = undefined
        this.state = {
            cards: [],
            isLoading: false
        }
        this._loadCards = this._loadCards.bind(this)
        this._searchCards = this._searchCards.bind(this)
    }

    _loadCards() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getAllCards(this.filter).then(data => {
                this.setState({
                    cards: [...this.state.cards, ...data.cards],
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchCards() {
        this.filter = "&name=" + this.searchedText
        this.setState({
            cards: [],
        }, () => {
            this._loadCards()
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

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du card'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchCards()}
                />
                <Button title='Rechercher' onPress={() => this._searchCards()} />
                {/* <CardSetList /> */}
                <CardList
                    cards={this.state.cards}
                    navigation={this.props.navigation}
                    selectModeEnabled={true}
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
    },
})

export default Search