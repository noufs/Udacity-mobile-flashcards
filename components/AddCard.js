import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addNewCard } from '../actions';
import { addCardToDeck } from '../utils/_Data';
import { lightPurp , gray} from '../utils/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextButton from './TextButton'
class AddCard extends Component {

    static navigationOptions = () => {
        return {
            title: 'Add Card'
        }
    }

    state = {
        question: '',
        answer: ''
    };

    createCard = () => {
        if (this.state.question.length > 0 && this.state.answer.length > 0) {
            const card = {
                question: this.state.question,
                answer: this.state.answer
            }
            const title = this.props.navigation.state.params.title

            this.props.dispatch(addNewCard(title, card))
            this.setState({
                question: '',
                answer: ''
            })
            
            addCardToDeck(title, card)
            this.props.navigation.navigate('DeckDetail', { title: title });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Question: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={question => this.setState({ question })}
                    onFocus={() => this.setState({ question: '', questionTooShort: false })}
                />
                <Text style={styles.label}>Answer: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={answer => this.setState({ answer })}
                    onFocus={() => this.setState({ answer: '', answerTooShort: false })}
                />
                <TextButton children={'Add Card'} onPress={this.createCard} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    label: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize:25,
    },
    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 5,
    }
});


export default connect()(AddCard);