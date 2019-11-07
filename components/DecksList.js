import React, { Component } from "react";
import { Text, StyleSheet, View, Animated, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { green, white, lightPurp} from "../utils/colors";
import { } from 'react-native-gesture-handler';

// state = {
//  btnPress: new Animated.Value(0)
// }

// animateButton = (navigation, title) => {
//     Animated.timing(this.state.btnPress, {
//         toValue:0.8,
//         duration:500
//     }).start()

//     //navigation.navigate("DeckDetail", { title: title })
// }

export default class DecksList extends Component {

    constructor(props) {
        super(props) 

        this.handlePressIn = this.handlePressIn.bind(this)
        this.handlePressOut = this.handlePressOut.bind(this)
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1)
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: 0.5
        }).start()
    }
    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start()

        this.navigateToDeckDetail()
    }

    navigateToDeckDetail(){
        this.props.navigation.navigate("DeckDetail", { title: this.props.title })
    }

    render() {
        const { title, numOfquestions, navigation } = this.props

        const animatedStyle = {
            transform: [{ scale: this.animatedValue }]
        }

        return (
            <View>
            <TouchableWithoutFeedback
              onPressIn={this.handlePressIn}
              onPressOut={this.handlePressOut}
            >
              <Animated.View style={[styles.container, animatedStyle]}>
              <Text style={styles.title}>{title}</Text>
               <Text style={styles.numOfquestions}>{numOfquestions} Cards</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: lightPurp,
        alignItems: "flex-start",
        height: 150,
        marginBottom: 10,
        marginTop: 50,
        padding: 20,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,     
    },
    deckContainer: {
   
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        color: white,
        alignItems: "center",
        justifyContent: 'center'
    },
    numOfquestions: {
        fontSize: 20,
        marginBottom: 5,
        color: white,
        alignSelf: 'flex-start'
    }
})

