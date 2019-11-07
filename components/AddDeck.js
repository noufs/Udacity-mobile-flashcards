import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput ,TouchableOpacity, Platform} from 'react-native';
import { addDeck , generateUID} from '../utils/_Data'
import { addNewDeck } from '../actions/index'
import { connect } from 'react-redux'
import {green , white,lightPurp} from '../utils/colors'
import TextButton from './TextButton'

  //this.props.dispatch(addNewDeck({[this.state.title]: null}))
  // removeDeck(this.state.title)
class AddDeck extends Component {
    state = {
        title: '',
        msg: ''
    }

    createDeck = () => {
        if (this.state.title.length != 0) {
            const id = generateUID()

            const deck = {
                [this.state.title]: {
                    id: id,
                    title: this.state.title,
                    questions: []
                }
            }

            this.props.dispatch(addNewDeck(deck))
            this.setState({ title: '' });

            addDeck(id, this.state.title);

            this.toDeck()
        }

    }

    toDeck = () => {
        this.props.navigation.navigate('DeckDetail', { title: this.state.title })
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.label}>Deck Title: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}/>
                <TextButton children={'Create'}  onPress={this.createDeck}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize:25,
    },
    input: {
        padding: 10,
        marginBottom: 10,
        fontSize: 25,
        borderWidth: 1,
        borderRadius:5,
    }
})

export default connect()(AddDeck)