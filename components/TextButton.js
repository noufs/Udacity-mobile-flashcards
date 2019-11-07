import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightPurp, white } from '../utils/colors'

export default function TextButton ({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.createBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: lightPurp,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50,
        marginRight: 50,
        marginBottom:5,
        marginTop:20,
        height: 50
      },
      createBtnText: {
        color: white,
        fontSize: 20,
        textAlign: "center",
        marginLeft: 50,
        marginRight: 50,
      },
})