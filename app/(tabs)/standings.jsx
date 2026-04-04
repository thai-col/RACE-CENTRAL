import { StyleSheet, Text, View } from 'react-native'

export default function Standings() {   

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Standings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712', 
    },
    heading: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
});