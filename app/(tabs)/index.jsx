import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Upcoming Events</Text>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712',
    },
    card: {
        alignItems: 'center',
        width: '90%',
        height: 200,
        padding: 20,
        backgroundColor: '#101726',
        borderColor: '#343e49',
        borderWidth: 1,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E10600',
    },
})