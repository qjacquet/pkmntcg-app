const initialState = { cards: [] }

function collection(state = initialState, action) {
	let nextState
	const cardIndex = state.cards.findIndex(item => item.id === action.card.id)
	switch (action.type) {
		// Not used
		case 'UPSERT':
			if (cardIndex !== -1) {
				nextState = {
					...state,
					cards: [
						...state.cards.filter((item, index) => index != cardTypeIndex),
						action.card
					]
				}
			}
			else {
				nextState = {
					...state,
					cards: [
						...state.cards,
						action.card
					]
				}
			}
			return nextState || state

		case 'ADD':
			if (action.collectionData.quantity > 0) {
				// Premier ajout de la carte
				if (cardIndex === -1) {
					nextState = {
						...state,
						cards: [
							...state.cards,
							action.card
						]
					}

					let newIndex = nextState.cards.findIndex(item => item.id === action.card.id)

					nextState.cards[newIndex].collectionData = [action.collectionData]
				}
				// Ajouts supplémentaires
				else {
					const collectionDataIndex = state.cards[cardIndex].collectionData.findIndex(item => item.type === action.collectionData.type && item.condition === action.collectionData.condition)
					if (collectionDataIndex !== -1) {
						state.cards[cardIndex].collectionData[collectionDataIndex] = action.collectionData
					}
					else {
						state.cards[cardIndex].collectionData.push(action.collectionData)
					}

					nextState = {
						...state,
						cards: [...state.cards]
					}
				}
			}
			return nextState || state
			
		// Not used
		case 'DELETE':
			if (cardIndex !== -1 && state.selectedCards[cardIndex].quantity > 0) {
				if (state.selectedCards[cardIndex].quantity == 1) {
					nextState = {
						...state,
						selectedCards: state.selectedCards.filter((item, index) => index !== cardIndex)
					}
				}
				else {
					nextState = {
						...state,
						selectedCards: [...state.selectedCards]
					}

					nextState.selectedCards[cardIndex].quantity--
				}

			}
			return nextState || state

		default:
			return state
	}
}

export default collection