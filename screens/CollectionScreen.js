import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CardList from '../components/CardList/CardList'

class CollectionScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <CardList
                    cards={this.props.selectedCards}
                    navigation={this.props.navigation}
                    selectModeEnabled={false}
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
        selectedCards: state.toggleCard.selectedCards
    }
}

export default connect(mapStateToProps)(CollectionScreen)