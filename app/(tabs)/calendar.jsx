import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import CalendarPicker from 'react-native-calendar-picker'
import { set } from 'date-fns'


const Calendar = () => {

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  return (
    <View style={styles.Container}>
      <View style={styles.testContainer}>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={(date) => setSelectedStartDate(date)}
            selectedDayColor="#E10600"
            todayBackgroundColor="#9d1712"
            textStyle={{ color: '#fff'}}
            headerWrapperStyle={{ backgroundColor: '#22265b', width: '100%' }}
            dayLabelsWrapper={{width: '100%', backgroundColor: '#22265b'}}
            

          />
          <View>
            <Text>SELECTED START DATE:{startDate}</Text>
          </View>
        </View>
      </View>
    </View>
    
  )
}

export default Calendar

const styles = StyleSheet.create({

    Container: {
      padding: 20,
      backgroundColor: '#030712',
      flex: 1,
    },
    HeaderControls: {
      justifyContent: 'space-around',

    },
    testContainer: {
        backgroundColor: '#030712',
        height: '100%',
    },
    calendarContainer: {
        backgroundColor: '#22265b',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 60,
        padding: 10,
    },
})

