import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import { green,lightPurp,white } from '../utils/colors';
import { connect } from 'react-redux';
import TextButton from './TextButton'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  // shouldComponentUpdate (nextProps) {
  //     return nextProps.metrics !== null && !nextProps.metrics.today
  //   }
  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{deck.title}</Text>
          <Text style={styles.count}>This deck has {deck.questions.length} cards</Text>
        </View>
          <TextButton children={'Add Card'}  onPress={() => this.props.navigation.navigate("AddCard", {title: deck.title}) }  />
          <TextButton children={'Start Quiz'}  onPress={() => this.props.navigation.navigate("Quiz" , {title: deck.title})}  />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 150,
    marginBottom: 10,
    marginTop: 50,
    padding: 20,
    borderRadius: 5,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5
  }
})

function mapStateToProps(decks, ownProps) {
  return {
    deck: decks[ownProps.navigation.state.params.title]
  }
}

export default connect(mapStateToProps)(DeckDetail)