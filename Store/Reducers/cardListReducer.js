const initialState = { selectedCards: [] }

function toggleCard(state = initialState, action) {
    let nextState
    const cardIndex = state.selectedCards.findIndex(item => item.id === action.value.id)
    switch (action.type) {
        case 'TOGGLE_CARD':
            if (cardIndex !== -1) {
                // Le film est d�j� dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    selectedCards: state.selectedCards.filter((item, index) => index !== cardIndex)
                }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute � la liste
                nextState = {
                    ...state,
                    selectedCards: [...state.selectedCards, action.value]
                }
            }
            return nextState || state

        case 'ADD_CARD':
            if (cardIndex !== -1) {
                nextState = {
                    ...state,
                    selectedCards: [...state.selectedCards]
                }

                nextState.selectedCards[cardIndex].quantity++
            }
            else 
            {
                // Le film n'est pas dans les films favoris, on l'ajoute � la liste
                nextState = {
                    ...state,
                    selectedCards: [...state.selectedCards, action.value]
                }

                let newIndex = nextState.selectedCards.findIndex(item => item.id === action.value.id)
                
                nextState.selectedCards[newIndex].quantity = 1
            }
            return nextState || state

        case 'REMOVE_CARD':
            if (cardIndex !== -1) {
                if (nextState.selectedCards[cardIndex].quantity == 1)
                {
                    nextState = {
                        ...state,
                        selectedCards: state.selectedCards.filter((item, index) => index !== cardIndex)
                    }
                }
                else 
                {
                    nextState.selectedCards[cardIndex].quantity--
                }

            }
            return nextState || state

        default:
            return state
    }
}

export default toggleCard