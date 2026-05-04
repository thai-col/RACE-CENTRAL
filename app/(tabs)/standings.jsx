import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList, View, Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const SERIES = [
  { label: 'Formula 1',  value: 'f1' },
  { label: 'MotoGP',     value: 'motogp' },
  { label: 'WEC',        value: 'wec' },
  { label: 'NASCAR Cup', value: 'nascar' },
  { label: 'IndyCar',    value: 'indycar' },
];

const PLACEHOLDER_STANDINGS = {
  motogp: [
    { id: '1', position: 1, name: 'F. Bagnaia',    team: 'Ducati Lenovo',     points: 98 },
    { id: '2', position: 2, name: 'J. Martin',     team: 'Aprilia Racing',    points: 85 },
    { id: '3', position: 3, name: 'M. Marquez',    team: 'Gresini Racing',    points: 72 },
    { id: '4', position: 4, name: 'E. Bastianini', team: 'Ducati Lenovo',     points: 60 },
    { id: '5', position: 5, name: 'B. Binder',     team: 'Red Bull KTM',      points: 55 },
  ],
  wec: [
    { id: '1', position: 1, name: 'Toyota GR010 #7',      team: 'Toyota Gazoo Racing',   points: 62 },
    { id: '2', position: 2, name: 'Ferrari 499P #50',     team: 'Ferrari AF Corse',      points: 57 },
    { id: '3', position: 3, name: 'Porsche 963 #6',       team: 'Porsche Penske',        points: 48 },
    { id: '4', position: 4, name: 'Cadillac V-Series #2', team: 'Chip Ganassi Racing',   points: 43 },
    { id: '5', position: 5, name: 'Alpine A424 #35',      team: 'Alpine Endurance',      points: 38 },
  ],
  nascar: [
    { id: '1', position: 1, name: 'K. Larson',  team: 'Hendrick Motorsports #5',  points: 820 },
    { id: '2', position: 2, name: 'C. Elliott', team: 'Hendrick Motorsports #9',  points: 791 },
    { id: '3', position: 3, name: 'D. Hamlin',  team: 'Joe Gibbs Racing #11',     points: 778 },
    { id: '4', position: 4, name: 'R. Blaney',  team: 'Team Penske #12',          points: 764 },
    { id: '5', position: 5, name: 'W. Byron',   team: 'Hendrick Motorsports #24', points: 753 },
  ],
  indycar: [
    { id: '1', position: 1, name: 'A. Palou',    team: 'Chip Ganassi Racing', points: 285 },
    { id: '2', position: 2, name: 'J. Dixon',    team: 'Chip Ganassi Racing', points: 264 },
    { id: '3', position: 3, name: "P. O'Ward",   team: 'Arrow McLaren',       points: 251 },
    { id: '4', position: 4, name: 'S. Pagenaud', team: 'Meyer Shank Racing',  points: 238 },
    { id: '5', position: 5, name: 'C. Herta',    team: 'Andretti Global',     points: 225 },
  ],
};


// Fetches the current Formula 1 driver standings from the OpenF1 API and returns an array of driver objects with their 
// position, name, team, and points.
async function fetchF1Standings() {
  const [{ data: standings }, { data: drivers }] = await Promise.all([
    axios.get('https://api.openf1.org/v1/championship_drivers?session_key=latest'),
    axios.get('https://api.openf1.org/v1/drivers?session_key=latest'),
  ]);

  const driverMap = Object.fromEntries(drivers.map(d => [d.driver_number, d]));

  return standings
    .map(entry => {
      const driver = driverMap[entry.driver_number];
      return {
        id:       String(entry.driver_number),
        position: entry.position_current,
        name:     driver ? `${driver.first_name[0]}. ${driver.last_name}` : `#${entry.driver_number}`,
        team:     driver?.team_name ?? '',
        points:   entry.points_current,
      };
    })
    .sort((a, b) => a.position - b.position);
}

export default function ChampionshipScreen() {
  const [selectedSeries, setSelectedSeries] = useState('f1');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedSeries === 'f1') {
      fetchF1Standings().then(setData);
    } else {
      setData(PLACEHOLDER_STANDINGS[selectedSeries] ?? []);
    }
  }, [selectedSeries]);

  return (
    <View style={styles.Container}>
      <Text style={styles.Heading}>Championship Standings</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
        data={SERIES}
        labelField="label"
        valueField="value"
        placeholder="Select a series"
        value={selectedSeries}
        onChange={item => setSelectedSeries(item.value)}
      />
      <SafeAreaView>
        <FlatList
          style={styles.driverList}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.textBg}>
              <Text style={styles.driverName}>{item.position}. {item.name}</Text>
              <Text style={styles.driverTeam}>{item.team} — {item.points} pts</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#030712',
    width: '100%',
  },
  driverName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverTeam: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  textBg: {
    backgroundColor: '#050d1a',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },
  driverList: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 10,
  },
  Heading: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
    marginTop: 60,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#E10600',
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
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

});