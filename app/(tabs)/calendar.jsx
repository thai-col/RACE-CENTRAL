import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const Calendar = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [events, setEvents] = useState([]);

  const year = new Date().getFullYear();

  const data = [
    { label: 'Formula 1', value: '4370' },
    { label: 'MotoGP', value: '4407' },
    { label: 'WEC', value: '4413' },
    { label: 'IndyCar', value: '4373' },
    { label: 'NASCAR', value: '4393' },
  ];

  const getEventsForSeason = async (leagueId, year) => {
    try {
      const res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=${leagueId}&s=${year}`
      );

      const data = await res.json();

      if (!data.events) return [];

      return data.events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedLeague) return;

      const events = await getEventsForSeason(selectedLeague, year);

      const eventDates = events.map(event => ({
        id: event.idEvent,
        name: event.strEvent,
        date: event.dateEvent,
        venue: event.strVenue,
      }));

      setEvents(eventDates);
    };

    fetchEvents();
  }, [selectedLeague]);

  return (
    <View style={styles.Container}>
      <Text style={styles.pageHeading}>Calendars</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select a series"
        value={selectedLeague}
        onChange={item => {
          setSelectedLeague(item.value);
        }}
      />

      <Text style={styles.heading}>Events in {year}</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Select a series to load events
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventText}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.eventText}>{item.venue}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  Container: {
    paddingTop: 60,
    backgroundColor: '#030712',
    flex: 1,
    paddingHorizontal: '5%',
  },
  pageHeading: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#E10600',
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#ffffff',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#ffffff',
    
  },
  itemContainerStyle: {
    backgroundColor: '#111827',
  },
  containerStyle: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 0,
    overflow: 'hidden',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#94a3b8',
    marginTop: 20,
    fontSize: 16,
    position: 'absolute',
    alignSelf: 'center',
  },
  eventCard: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventText: {
    color: '#cbd5e1',
    marginTop: 4,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

});