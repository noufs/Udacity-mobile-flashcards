import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View,ListRenderItem, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { handleGetDecks } from '../actions/index';
import DecksList from './DecksList'

class Decks extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetDecks())
  }

  keyExtractor = (item, index) => item.id

  render() {
    return (
      <View style={styles.container}>
        <FlatList
           keyExtractor = {this.keyExtractor}
          data={Object.values(this.props.decks)}
          renderItem={({ item }) => (
            <DecksList
              id={item.id}
              title={item.title}
              numOfquestions={item.questions.length}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'space-around',
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks); 