import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';
import { router } from 'expo-router';

const Preferences = () => {

  const [selected, setSelected] = useState([]);

  const toggleSelection = (seriesId) => {
    if (selected.includes(seriesId)) {
      setSelected(selected.filter(item => item !== seriesId));
    } else {
      setSelected([...selected, seriesId]);
    }
  };

  const [seriesList, setSeriesList] = useState([]);
  
  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const { data, error } = await supabase.from('series').select('*');
    if (error) {
      console.error('Error fetching series:', error);
      return;
    }
    const seriesWithImages = data.map(series => {
      const { data: publicUrlData } = supabase.storage.from('series').getPublicUrl(series.image_path);
      return {
        ...series,
        imageUrl: publicUrlData.publicUrl
      };
    });
    setSeriesList(seriesWithImages);
  };

  const savePreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('User not authenticated');
        return;
      }

      // Build rows
      const rows = selected.map(seriesId => ({
        user_id: user.id,
        series_id: seriesId
      }));

      // Optional: clear old prefs first
      await supabase
        .from('user_preferences')
        .delete()
        .eq('user_id', user.id);

      // Insert new ones
      const { error } = await supabase
        .from('user_preferences')
        .insert(rows);

      if (error) throw error;

      alert('Saved!');
      router.replace('/(tabs)');

    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the Series You'd Like to Follow</Text>

      {seriesList.map((series) => {
        const isSelected = selected.includes(series.id);

        return (
          <TouchableOpacity
            key={series.id}
            style={[
              styles.button,
              isSelected && styles.selectedButton
            ]}
            onPress={() => toggleSelection(series.id)}
          >
            <Image source={{ uri: series.imageUrl }} style={styles.logoImage} />
            <Text style={styles.buttonText}>{series.name}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
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
  saveButton: {
    backgroundColor: '#E10600',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
