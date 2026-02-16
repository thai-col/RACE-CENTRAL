import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

const Preferences = () => {

  const [selected, setSelected] = useState([]);

  const toggleSelection = (series) => {
    if (selected.includes(series)) {
      setSelected(selected.filter(item => item !== series));
    } else {
      setSelected([...selected, series]);
    }
  };

  const seriesList = [
    { name: 'Formula 1', image: require('../../assets/image/f1-logo.png') },
    { name: 'WEC', image: require('../../assets/image/wec-logo.png') },
    { name: 'MotoGP', image: require('../../assets/image/MotoGP-logo.png') },
    { name: 'NASCAR', image: require('../../assets/image/nascar-logo.png') },
    { name: 'IndyCar', image: require('../../assets/image/indycar-logo.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the Series You'd Like to Follow</Text>

      {seriesList.map((series) => {
        const isSelected = selected.includes(series.name);

        return (
          <TouchableOpacity
            key={series.name}
            style={[
              styles.button,
              isSelected && styles.selectedButton
            ]}
            onPress={() => toggleSelection(series.name)}
          >
            <Image source={series.image} style={styles.logoImage} />
            <Text style={styles.buttonText}>{series.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 75,
    backgroundColor: '#030712',
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#171F2D',
    padding: 15,
    borderColor: '#222734',
    borderRadius: 10,
    width: '85%',
    height: 90,
    borderWidth: 2,
    marginTop: 20,
  },
  selectedButton: {
    borderColor: '#E10600', // Red highlight when selected
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoImage: {
    width: '30%',
    height: 60,
    resizeMode: 'contain',
  },
});
