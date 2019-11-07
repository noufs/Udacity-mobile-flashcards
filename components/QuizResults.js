import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { green, white ,lightPurp, pink} from "../utils/colors";
import TextButton from './TextButton'
import {NavigationActions} from 'react-navigation'
export default QuizResults = ({ correctAnswers, wrongAnswers , restart, goBack}) => (
    <View style={styles.container}>
       <Text style={styles.title}>Total Answered: <Text style={{color:pink}}>{correctAnswers+wrongAnswers}</Text></Text>
       <Text style={styles.numOfquestions}>Correct Answers: <Text style={{color:pink}}>{correctAnswers}</Text></Text>
       <Text style={styles.numOfquestions}>Wrong Answers: <Text style={{color:pink}}>{wrongAnswers}</Text></Text>
       <TextButton children={'Restart Quiz'} onPress={restart} />
       <TextButton children={'Return'} onPress={goBack} />

    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 150,
        marginBottom: 10,
        marginTop: 10,
        padding: 20,
        marginRight: 20,
        marginLeft:20,
        },
    title: {
        fontSize: 25,
        marginBottom: 10,
        alignContent:'stretch',
        alignItems: "flex-start",
    },
    numOfquestions: {
        fontSize: 20,
        marginBottom: 5,
        alignSelf:'flex-start'
    }
})

