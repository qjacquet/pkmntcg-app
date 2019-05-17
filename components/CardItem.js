import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, CheckBox } from 'react-native'
import moment from 'moment'
import FadeIn from '../Animation/FadeIn'
import { connect } from 'react-redux'
import { Icon } from 'expo';

class CardItem extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.nextPage = 0
        this.state = {
            selectedIds: [],
            isLoading: false
        }
        this._toggleCard = this._toggleCard.bind(this)
        this._addCard = this._addCard.bind(this)
        this._removeCard = this._removeCard.bind(this)
        this._getCardCount = this._getCardCount.bind(this)
    }

    _addCard(card) {
        const action = { type: "ADD_CARD", value: card }
        this.props.dispatch(action)
    }

    _removeCard(card) {
        const action = { type: "REMOVE_CARD", value: card }
        this.props.dispatch(action)
    }

    _toggleCard(card) {
        const action = { type: "TOGGLE_CARD", value: card }
        this.props.dispatch(action)
    }

    _isSelected(id) {
        if (this.props.selectedCards.findIndex(item => item.id === id) != -1) {
            return true;
        }
        return false;
    }

    _getCardCount(id) {
        const cardIndex = this.props.selectedCards.findIndex(item => item.id === id)
        if (cardIndex === -1) {
            return 0
        }
        return this.props.selectedCards[cardIndex].quantity;
    }

    render() {
        const { card, displayDetailForCard, selectModeEnabled } = this.props
        return (
            <View>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForCard(card.id)}>
                    <Image
                        style={this._isSelected(card.id) ? styles.image : styles.image_disabled}
                        source={{ uri: card.imageUrl }}
                    />
                </TouchableOpacity>
                {selectModeEnabled &&
                <View style={styles.action_count}>
                    <TouchableOpacity
                        onPress={() => this._removeCard(card)}>
                        <Icon.Ionicons
                            name="md-remove-circle"
                            size={30}
                            color="red"
                        />
                    </TouchableOpacity>

                    <Text>{this._getCardCount(card.id)}</Text>

                    <TouchableOpacity
                        onPress={() => this._addCard(card)}>
                        <Icon.Ionicons
                            name="md-add-circle"
                            size={30}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
                }

                {/* {selectModeEnabled &&
					<CheckBox
						style={styles.checkbox}
						value={this._isSelected(card.id)}
						onChange={() => this._toggleCard(card)}
					/>
				} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    image_disabled: {
        width: 120,
        height: 180,
        margin: 5,
        opacity: 0.3
    },
    action_count: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
	checkbox: {
        position: 'absolute'
    }
})

const mapStateToProps = (state) => {
    return {
        selectedCards: state.toggleCard.selectedCards
    }
}

export default connect(mapStateToProps)(CardItem)