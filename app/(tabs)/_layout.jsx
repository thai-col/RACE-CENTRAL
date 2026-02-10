import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const RootLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false, tabBarStyle: { backgroundColor: '#030712', borderTopWidth: 0 }, tabBarActiveTintColor: '#E10600', tabBarShowLabel: false }}>
        <Tabs.Screen 
        name="index" 
        options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
            }}
        />
        <Tabs.Screen 
        name="calendar"
        options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
            }}
        />
        <Tabs.Screen 
        name="settings"
        options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
            }}
        />
    </Tabs>
  )
}

export default RootLayout

const styles = StyleSheet.create({})