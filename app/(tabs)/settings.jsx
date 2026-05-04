import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router';
import supabase from '../config/supabase';


//The settings screen of the app that allows the user to manage their preferences and log out.
// manage preferences button takes the user to the preferences screen where they can select which racing series they want to follow.
// logout button signs the user out of their account and takes them back to the login screen.

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Sign out failed: ' + error.message);
    return;
  }
  router.replace('/(auth)/login');
};

const settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <TouchableOpacity style={styles.managePrefButton} onPress={() => router.push('/preferences')}>
        <Text style={{color: '#fff', fontSize: 18}}>Manage Preferences</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={{color: '#fff', fontSize: 18}}>Logout</Text>
       </TouchableOpacity>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712',
        justifyContent: 'flex-start',
        paddingTop: 60,
    },
    heading: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    managePrefButton: {
        backgroundColor: '#111827',
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#E10600',
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
    }

})