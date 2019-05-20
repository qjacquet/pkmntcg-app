import React from 'react'
import { StyleSheet, FlatList, SectionList, Text, View } from 'react-native'
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
		  this._getDataFormated = this._getDataFormated.bind(this)
		  this._renderSection = this._renderSection.bind(this)
		  this._getCountOfCardsBySeries = this._getCountOfCardsBySeries.bind(this)
		  this._getCountOfUniqueCardsBySeries = this._getCountOfUniqueCardsBySeries.bind(this)
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
	 
	 _getDataFormated(data) {
		return data.reduce((acc, item) => {
			const foundIndex = acc.findIndex(element => element.key === item.series);
			if (foundIndex === -1) {
			  return [
				 ...acc, 
				 {
					key: item.series,
					data: [item],
				 },
			  ];
			}
			acc[foundIndex].data = [...acc[foundIndex].data, item];
			return acc;
		 }, []);
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

	_getCountOfUniqueCardsBySeries(series) {
		// voir si possible a compter depuis l'item "section"
		return 0
	} 

	 _getCountOfCardsBySeries(series) {
		var count = 0
		for(var i = 0; i < this.props.cardSets.length; ++i) {
			 if(this.props.cardSets[i].series == series)
				count+= this.props.cardSets[i].totalCards
		}
		return count
	} 

	/**
	 * Render
	 */
	 
	_renderSection = ({ section }) => (
		<View style={ styles.section }>
		  <Text style={{ color: 'white' }}>{section.key.toUpperCase()} {this._getCountOfUniqueCardsBySeries(section.key)} / {this._getCountOfCardsBySeries(section.key)}</Text>
		</View>
	)

	render() {
		return (
			// <FlatList
			// 	style={styles.list}
			// 	data={this.props.cardSets || this.state.cardSets}
			// 	keyExtractor={(item) => item.code.toString()}
			// 	renderItem={({ item }) => (
			// 		<CardSetsListItem
         //                selectModeEnabled={this.props.selectModeEnabled}
			// 			cardSet={item}
			// 			navigation={this.props.navigation}
			// 		/>
			// 	)}
				
			// />
			<SectionList
				sections={this._getDataFormated(this.props.cardSets) || this._getDataFormated(this.state.cardSets)}
				renderSectionHeader={this._renderSection}
				stickySectionHeadersEnabled
				renderItem={({ item }) => (
					<CardSetsListItem
                  selectModeEnabled={this.props.selectModeEnabled}
						cardSet={item}
						navigation={this.props.navigation}
					/>
				)}
				keyExtractor={(item) => item.code.toString()}
			/>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1
	 },
	section: {
		padding: 8, 
		backgroundColor: '#4fc3c8'
	} 
})

const mapStateToProps = (state) => {
	return {
		 selectedCards: state.toggleCard.selectedCards
	}
}

export default connect(mapStateToProps)(CardSetsList)