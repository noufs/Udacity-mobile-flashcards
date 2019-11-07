import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'Mobile_Flashcards:decks';

const decksData = { //add ids
  React: {
    id: 'pgzxpfaczos8gqwhax0nua',
    title: 'React',
    questions: [
      {
        question: 'Is React a Javascript UI library?',
        answer: 'Correct'
      },
      {
        question: 'Correct place to make Ajax requests is in a render method?',
        answer: 'Incorrect'
      }
    ]
  },
  JavaScript: {
    id: '8dbeadx7xe1i5jbjzda9ti',
    title: 'JavaScript',
    questions: [
      {
        question: 'Closure is a combination of a function and lexical environment within which that function was declared?',
        answer: 'Yes'
      }, 
      { 
        question: 'JavaScript is considered a weakly typed (or untyped) language?',
        answer: 'Correct'
      }
    ]
  }
}


  export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }


export function _getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(result => {
    if(result !== null) {
      return JSON.parse(result) 
    } else {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decksData));
      return decksData;
    }
  });
}

// export function _getDecks() {
//     return AsyncStorage.getItem(STORAGE_KEY).then(results => {
//         const data = JSON.parse(results)
//         return data
//     })
// }


export function getDeck(title) {
  return _getDecks()
    .then((decks) => decks[title])
}

export function addDeck(id, title) {
  const deck = { id, title, questions: [] }
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: deck
  }))
}

export function addCardToDeck(title, card) {
  return _getDecks()
    .then((decks) => {
      decks[title].questions.push(card)
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
    })
}


export function removeDeck(title) {
    return AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      })
  }