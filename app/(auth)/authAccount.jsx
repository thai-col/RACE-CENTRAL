import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import React from 'react'

const authAccount = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please go to your email and follow the confirmation link to complete your registration.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.buttonText}>I have confirmed my account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default authAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030712',
    padding: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
    button: {
    backgroundColor: '#E10600',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})