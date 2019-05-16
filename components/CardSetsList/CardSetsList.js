import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CardSetsListItem from './CardSetsListItem'
import { connect } from 'react-redux'
import { getCardSetsStandard, getCardSets } from '../../api/cards.api'

class CardSetsList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
            cardSets: [],
            cardSetsFilter: undefined
        }
        this._loadCardSets = this._loadCardSets.bind(this)
	}

	componentDidMount() {
        if (this.props.navigation.state.params != undefined) {
            this.setState({
                cardSetsFilter: this.props.navigation.state.params.filter || "" // filtre contenant les param�tres pour l'url de l'api... � am�liorer
            }, () => {
                this._loadCardSets()
            })
        }
        else {
            this.setState({
                cardSetsFilter: this.props.filter || "" // filtre contenant les param�tres pour l'url de l'api... � am�liorer
            }, () => {
                this._loadCardSets()
            })
        }
    }
    
    _loadCardSets() {
        if (this.state.cardSetsFilter == "") {
            return null
        }
		getCardSets(this.state.cardSetsFilter).then(data => {
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
			<FlatList
				style={styles.list}
				data={this.props.cardSets || this.state.cardSets}
				keyExtractor={(item) => item.code.toString()}
				renderItem={({ item }) => (
					<CardSetsListItem
						cardSet={item}
						navigation={this.props.navigation}
					/>
				)}
				numColumns={2}
			/>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1
	}
})

const mapStateToProps = state => {
	return {
	}
}

export default CardSetsList