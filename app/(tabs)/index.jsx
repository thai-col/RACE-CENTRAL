import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <ImageBackground source={require('../../assets/image/racetrackbg.jpg')} style={{ flex: 1, resizeMode: 'cover' }}>
        <LinearGradient
            colors={['rgba(3, 7, 18, 0.8)', 'rgba(3, 7, 18, 1)']}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.title2}>RaceCentral!</Text>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Upcoming Events</Text>
                </View>
            </View>
        </LinearGradient>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        paddingTop: 75,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
    },
        title2: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#E10600',
    },
    cardContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'top',
    },
    card: {
        width: '85%',
        height: 200,
        backgroundColor: '#171F2D',
        borderColor: '#343e49',
        borderWidth: 1,
        borderRadius: 10,
    },
    cardText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    }
})