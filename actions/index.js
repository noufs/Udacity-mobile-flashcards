import { _getDecks } from '../utils/_Data';

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_DECK = 'REMOVE_DECK';

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addNewDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addNewCard(deck, card) {
    return {
        type: ADD_CARD,
        deck,
        card
    }
}

export function removeDeck(deck) {
    return {
        type: REMOVE_DECK,
        deck,
    }
}

export function handleGetDecks() {
    return (dispatch) => {
        return _getDecks()
            .then((decks) => {
                dispatch(getDecks(decks))
            })
    }
}
