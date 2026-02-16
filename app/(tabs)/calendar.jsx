import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import CalendarPicker from 'react-native-calendar-picker'
import { set } from 'date-fns'


const Calendar = () => {

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarPicker
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            todayBackgroundColor="#e6f2ff"
            textStyle={{
            color: '#ffffff',
          }}
        />
        <View>
          <Text>SELECTED START DATE:{startDate}</Text>
        </View>
      </View>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712',
        padding: 20,
    },
})

