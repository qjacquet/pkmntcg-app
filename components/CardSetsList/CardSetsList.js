import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CardSetsListItem from './CardSetsListItem'
import { connect } from 'react-redux'
import { getCardSetsStandard } from '../../api/cards.api'

class CardSetsList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			cardSets: []
		}
	}


	_displayDetailForCardSet = (idCardSet) => {
		//this.props.navigation.navigate('CardSetDetail', { idCardSet: idCardSet })
	}

	componentDidMount() {
		getCardSetsStandard().then(data => {
			this.setState({
				// Ajout des extensions bien ordonées par date
				cardSets: data.sets
					.sort(function(a, b) {
						return b.date > a.date;
				 	})
			})
		})
	}

	render() {
		if (this.state.cardSets.length == 0){
			return null
		}
		return (
			<FlatList
				style={styles.list}
				data={this.state.cardSets}
				keyExtractor={(item) => item.code.toString()}
				renderItem={({ item }) => (
					<CardSetsListItem
						cardSet={item}
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