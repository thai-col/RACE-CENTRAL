  import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
  import { getUsersNextEvent } from '../../backend/services';
  import { useEffect, useState } from 'react';
  import supabase from '../config/supabase';
  import { StatusBar } from 'expo-status-bar';
  import { router } from 'expo-router';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { getAllNextEvents } from '../../backend/services';

  function calendarDateCountdown(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    const diffMs = target - now;

    if (diffMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  export default function Home() {
    const [event, setEvent] = useState(null);
    const [profile, setProfile] = useState(null);
    const [countdown, setCountdown] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [userSeries, setUserSeries] = useState([]);

    const fetchUserSeries = async (userId) => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select(`
          series:series_id (
            id,
            name,
            api_id
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      setUserSeries(data.map((item) => item.series));
    };

    useEffect(() => {
      const load = async () => {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('User not authenticated');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        } else {
          setProfile(profileData);
        }

        const nextEvent = await getUsersNextEvent(user.id);
        setEvent(nextEvent);

        await fetchUserSeries(user.id);
      };

      load();
    }, []);

    useEffect(() => {
      if (!event?.dateEvent) return;

      setCountdown(calendarDateCountdown(event.dateEvent));

      const interval = setInterval(() => {
        const result = calendarDateCountdown(event.dateEvent);
        setCountdown(result);

        if (
          result.days === 0 &&
          result.hours === 0 &&
          result.minutes === 0 &&
          result.seconds === 0
        ) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [event?.dateEvent]);

    useEffect(() => {
      const loadAllEvents = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('User not authenticated');
          return;
        }

        const events = await getAllNextEvents(user.id);
        setAllEvents(events);
      };

      loadAllEvents();
    }, []);


    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.welcomeText}>
          Welcome back, {profile?.display_name || 'User'}!
        </Text>

        <View style={styles.nextContainer}>
          <Text style={styles.nextEvent}>Next Event:</Text>
          <Text style={styles.tableText}>
            {event ? `${event.seriesName} - ${event.strEvent}` : 'No upcoming events'}
          </Text>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>
              {countdown.days} Days : {countdown.hours} Hours : {countdown.minutes} Minutes : {countdown.seconds} Seconds
            </Text>
          </View>
        </View>

        <View style={styles.userSeriesContainer}>
          <Text style={styles.nextEvent}>Your Series:</Text>
          <FlatList
            data={userSeries}
            style={styles.series}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.seriesText}>{item.name}</Text>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/preferences')}>
            <Text style={styles.managePreferencesButton}>Manage Preferences <Ionicons name="arrow-forward-outline" size={16} color="#fff" /></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.allSeriesContainer}>
          <Text style={styles.nextEvent}>Upcoming Events:</Text>
          <FlatList
            data={allEvents}
            style={styles.series}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.seriesText}>
                {item.seriesName} - {item.eventName} - {new Date(item.date).toLocaleDateString()}
              </Text>
            )}
          />
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 60,
      backgroundColor: '#030712',
    },
    welcomeText: {
      color: '#ffffff',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    nextEvent: {
      color: '#e7e7e7',
      fontSize: 16,
      alignSelf: 'flex-start',
      marginBottom: 5,
    },
    nextContainer: {
      backgroundColor: '#E10600',
      borderWidth: 1,
      borderRadius: 8,
      width: '90%',
      padding: 10,
    },
    tableText: {
      color: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    countdownContainer: {
      alignItems: 'center',
      backgroundColor: '#9d1712',
      borderRadius: 5,
      marginTop: 5,
    },
    countdownText: {
      color: '#fff',
      fontSize: 18,
      padding: 10,
    },
    userSeriesContainer: {
      backgroundColor: '#111827',
      borderRadius: 8,
      width: '90%',
      padding: 10,
      marginVertical: 10,
      borderColor: '#222734',
    },
      allSeriesContainer: {
      backgroundColor: '#111827',
      borderColor: '#222734',
      borderRadius: 8,
      width: '90%',
      padding: 10,
    },
    seriesText: {
      color: '#fff',
      fontSize: 16,
      padding: 10,
      backgroundColor: '#050d1a',
      borderRadius: 5,
      marginVertical: 3,
    },
    managePreferencesButton: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      marginTop: 10,
    },
  });