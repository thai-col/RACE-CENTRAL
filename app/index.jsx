import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import supabase from '../app/config/supabase';

// The main entry point of the app that checks the user's authentication status and onboarding completion.
// If the user is not authenticated, it redirects to the registration screen. 
// If the user is authenticated but has not completed onboarding, it redirects to the preferences screen. 
// If the user is authenticated and has completed onboarding, it redirects to the home screen. 
// It also listens for authentication state changes to handle sign-out events and redirect accordingly.
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