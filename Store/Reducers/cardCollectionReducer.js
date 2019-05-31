const initialState = { cards: [] }

function collection(state = initialState, action) {
	let nextState
	const cardIndex = state.cards.findIndex(item => item.id === action.value.id)
	// const rarityIndex = state.cards.findIndex(item => item.rarity == action.value.rarity)
	// const cardrarityIndex = state.cards.findIndex(item => item.id === action.value.id && item.rarity == action.value.rarity)
	switch (action.type) {
		case 'UPSERT':
				console.log("rarity : " + action.value.rarity)
				console.log("cardIndex : " + cardIndex)
				// console.log("rarityIndex : " + rarityIndex)
				// console.log("cardRarityIndex : " + cardrarityIndex)
				console.log("===== NEW CARD =======")
				console.log(action.value)
				//console.log("===== ALL CARDS =======")
				// console.log(state.cards)
				// console.log("\n \n \n")

			/** Delete */
			if (cardIndex !== -1) {

				// nextState = {
				// 	...state,
				// 	cards: state.cards.filter((item, index) => index !== cardrarityIndex)
				// }

				// console.log("===== STATE =======")
				// console.log(state.cards)
				// console.log("\n \n \n")
				console.log("===== FILTERED LIST ===== \n")
				console.log(state.cards.filter(item => !(item.id === action.value.id && item.rarity === action.value.rarity)))
				console.log("\n \n \n")

				//nextState = state

				nextState = {
					...state,
					cards: [
						...state.cards.filter(item => !(item.id === action.value.id && item.rarity === action.value.rarity)), 
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

			console.log("===== NEXT STATE =======")
			console.log(nextState.cards)
			console.log("\n \n \n")

			/** Insert */
			// nextState = {
			// 	...nextState,
			// 	cards: [
			// 		...state.cards, 
			// 		action.value
			// 	]
			// }



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