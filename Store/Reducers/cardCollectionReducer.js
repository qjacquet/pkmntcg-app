const initialState = { cards: [] }

function collection(state = initialState, action) {
	let nextState
	const cardIndex = state.cards.findIndex(item => item.id === action.value.id)
	const cardTypeIndex = state.cards.findIndex(item => item.id === action.value.id && item.collectionData.type === action.value.collectionData.type)
	switch (action.type) {
		// Not used
		case 'UPSERT':
			if (cardIndex !== -1) {
				nextState = {
					...state,
					cards: [
						...state.cards.filter((item, index) => index != cardTypeIndex),
						action.value
					]
				}
			}
			else {
				nextState = {
					...state,
					cards: [
						...state.cards,
						action.value
					]
				}
			}
			return nextState || state

		case 'ADD':
			let adds = []
			for(let i; i < action.quantity < i++;)
			{
				adds.push(action.value)
			}
			nextState = {
				...state,
				cards: [
					...state.cards,
					action.value
				]
			}
			return nextState || state
		// Not used
		case 'REMOVE_CARD':
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