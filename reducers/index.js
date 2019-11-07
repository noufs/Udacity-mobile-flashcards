import { GET_DECKS,ADD_DECK,ADD_CARD,REMOVE_DECK } from '../actions/index';

export default function deckReducer(state = {}, action) {
  switch(action.type) {
    case GET_DECKS:
        return {
            ...state,
            ...action.decks
        }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      state[action.deck].questions.push(action.card);
      return {
        ...state,
        [action.deck]: state[action.deck]
      }
    case REMOVE_DECK:
        return {
            ...state,
            [action.deck]: undefined
        }
    default:
      return state;
  }
}