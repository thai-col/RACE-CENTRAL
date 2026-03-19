import axios from 'axios';
import react from 'react';
import supabase from '../app/config/supabase';

export const getUserPreferredSeries = async (userId) => {
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

    console.log('Fetched user preferences:', data);

  if (error) throw error;

  return data.map(item => item.series);
};

export const getUsersNextEvent = async (userId) => {
  const series = await getUserPreferredSeries(userId);
  console.log('User preferred series:', series);
  if (!series.length) return null;

  const requests = series.map(s =>
    axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=${s.api_id}`
    )
  );

  console.log('Series for user:', series);

  const responses = await Promise.all(requests);

  let events = [];

  responses.forEach((res, i) => {
    if (res.data.events?.length) {
      events.push({
        ...res.data.events[0],
        seriesName: series[i].name
      });
    }
  });

  events.sort((a, b) => new Date(a.dateEvent) - new Date(b.dateEvent));

  console.log('Fetched events:', events);
  
  return events[0];
};

