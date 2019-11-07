import React from 'react';
import { StyleSheet, Text, View ,Platform} from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks'
import { setLocalNotification} from './utils/helpers'
import thunk from 'redux-thunk';
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { green, white } from './utils/colors'
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'

const Tabs = createBottomTabNavigator ({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? green : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : green,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen:DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  AddCard: {
    screen:AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Quiz: {
    screen:Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  QuizResults: {
    screen:QuizResults,
    navigationOptions:{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  render() {
    const AppContainer = createAppContainer(MainNavigator)
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View  style={{flex: 1}}>
          <AppContainer  />
        </View>
      </Provider>
    )
  }
}
