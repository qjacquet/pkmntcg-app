import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, CheckBox, PureComponent  } from 'react-native'
import { Overlay } from 'react-native-elements'
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
	 }
	 
    _isSelected(id) {
        if (this.props.selectedCards.findIndex(item => item.id === id) != -1) {
            return true;
        }
        return false;
    }
	 	 
   render() {
        const { card, toggleCardModal } = this.props
        return (
            <View>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => toggleCardModal(card)}>
                    <Image
                        style={this._isSelected(card.id) ? styles.image : styles.image_disabled}
                        source={{ uri: card.imageUrl }}
                    />
                </TouchableOpacity>
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