import React from 'react'
import { StyleSheet, FlatList, Text } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'

class CardModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isVisible: false
		}
		this._update = this._update.bind(this)

	}

	componentWillUpdate() {
		if (!this.state.isVisible) {
			this._update()
		}
	}

	//   componentWillReceiveProps(nextProps) {
	// 	console.log(this.state.isVisible)
	// 	this._update()
	//   }

	_update() {
		const { visibility } = this.props
		this.setState({
			isVisible: visibility
		}, () => {
			//console.log(this.state.modal)
		})
	}

	render() {
		const { card, visibility } = this.props
		return (
			<Overlay
				isVisible={this.state.isVisible}
				onBackdropPress={() =>
					this.setState({
						isVisible: false,
						card: undefined
					})}>
				<Text>Hello from Overlay!</Text>
			</Overlay>
		)
	}

}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
	return {
	}
}

export default CardModal