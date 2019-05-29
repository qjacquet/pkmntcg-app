const initialState = { cards: [] }

function collection(state = initialState, action) {
	let nextState
	const cardIndex = state.cards.findIndex(item => item.id === action.value.id)
	switch (action.type) {
		case 'UPSERT':
			/** Delete */
			if (cardIndex !== -1) {
				nextState = {
					...state,
					cards: state.cards.filter((item, index) => index !== cardIndex)
				}
			}

			/** Insert */
			nextState = {
				...state,
				cards: [...state.cards, action.value]
			}

			return nextState || state

		case 'DELETE':
			if (cardIndex !== -1) {
				nextState = {
					...state,
					cards: state.cards.filter((item, index) => index !== cardIndex)
				}
			}
			return nextState || state

		default:
			return state
	}
}

export default collection