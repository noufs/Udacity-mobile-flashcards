import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import QuizResults from './QuizResults'
import {NavigationActions} from 'react-navigation'
import {lightPurp, pink, white, gray} from '../utils/colors'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: `Quiz on ${title}`
        }
    }

    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        showResults: false,
        itemToShow: 'q'
    }

    resetState = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            showResults: false,
            itemToShow: 'q'
        })
    }

    answer(answer) {
        if (answer === 'correct') {
            this.setState({ correctAnswers: this.state.correctAnswers + 1  })
        }
        else {
            this.setState({ wrongAnswers: this.state.wrongAnswers + 1 })
        }

        if (this.state.currentQuestion === this.props.questions.length - 1) {
            this.setState({ showResults: true })
            //clear today notif after last question
            clearLocalNotification()
            setLocalNotification()

        } else {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 , itemToShow: 'q'})
        }
    }

    toggle = () => {
        const itemToShow = (this.state.itemToShow) === 'q'
          ? 'a'
          : 'q'
      
        this.setState({ itemToShow });
      }

      goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
      }

      
    render() {
        const { currentQuestion } = this.state
        
        const card = this.props.questions[currentQuestion]
        
        if(this.state.showResults) {
            return (
              <QuizResults 
                correctAnswers={this.state.correctAnswers}
                wrongAnswers={this.state.wrongAnswers}
                restart={this.resetState}
                goBack={this.goBack}
              />
            );
          }

        return (
            //return no questions are available if there aren't any
            <View style={styles.container}>
                {this.props.questions.length == 0
                    ? <Text style={styles.label}>There are no questions in this deck</Text>
                    : <View>
                        <Text style={styles.label}>Card {this.state.currentQuestion + 1}/{this.props.questions.length}</Text>
                        <View>
                            <Text style={styles.question}>Question: </Text>
                            <Text style={styles.answer}>{card.question}</Text>
                            {this.state.itemToShow == 'q'
                                ? <Text></Text>
                                : <View>
                                    <Text style={styles.question}>Answer: </Text>
                                    <Text style={styles.answer}>{card.answer}</Text>

                                    <Text style={styles.label}>How was you Answer?</Text>
                                    <TextButton children={'Correct'} onPress={() => this.answer('correct')} />
                                    <TextButton children={'Wrong'} onPress={() => this.answer('wrong')} />
                                </View>
                            }

                            <TouchableOpacity style={styles.button} onPress={this.toggle}>
                                <View>
                                    {this.state.itemToShow == 'q'
                                        ? <Text style={styles.btnText}>Show Answer</Text>
                                        : <Text style={styles.btnText}>Hide Answer</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginTop: 20,
        padding: 20,
        borderRadius: 5,
      },
      button: {
        backgroundColor: pink,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50,
        marginRight: 50,
        marginBottom:5,
        marginTop:50,
        height: 50
      },
      btnText: {
        color: white,
        fontSize: 20,
        textAlign: "center",
        marginLeft: 50,
        marginRight: 50,
      },
      label:{
        justifyContent:'flex-start',
        alignContent:'flex-start',
        fontSize:25,
        marginTop: 20,
      },
      question:{
        justifyContent:'flex-start',
        alignContent:'flex-start',
        fontSize:20,
        marginTop: 20,
        fontWeight: 'bold'
      },
      answer:{
        justifyContent:'flex-start',
        alignContent:'flex-start',
        fontSize:18,
        color:gray
      }
})

function mapStateToProps(state, ownProps) {
    const title = ownProps.navigation.state.params.title
    return {
        questions: state[title].questions
    }
  }

  
export default connect(mapStateToProps)(Quiz)