const initialState = { cardSearchFilter: [] }

function toggleCardSet(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_CARDSET':
      const cardSetIndex = state.cardSearchFilter.selectedSets.findIndex(item => item.id === action.value)
      if (cardSetIndex !== -1) {
        // Le film est d�j� dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.cardSearchFilter.selectedSets.filter( (item, index) => index !== cardSetIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute � la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.cardSearchFilter.selectedSets, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleCardSet