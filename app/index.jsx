import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import supabase from '../app/config/supabase';

export default function Index() {
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setRedirectTo('/(auth)/register');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', session.user.id)
        .single();

      if (error || !profile) {
        setRedirectTo('/(auth)/register');
        return;
      }

      if (profile.onboarding_complete === false) {
        setRedirectTo('/(auth)/preferences');
      } else {
        setRedirectTo('/(tabs)');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setRedirectTo('/(auth)/register');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!redirectTo) {
    return (
      <View style={{ flex: 1, backgroundColor: '#030712', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#E10600" size="large" />
      </View>
    );
  }

  return <Redirect href={redirectTo} />;
}