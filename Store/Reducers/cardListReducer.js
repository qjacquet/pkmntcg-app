const initialState = { selectedCards: [] }

function toggleCard(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_CARD':
      const cardIndex = state.selectedCards.findIndex(item => item.id === action.value)
      if (cardIndex !== -1) {
        // Le film est d�j� dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          selectedCards: state.selectedCards.filter( (item, index) => index !== cardIndex)
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
  default:
    return state
  }
}

export default toggleCard