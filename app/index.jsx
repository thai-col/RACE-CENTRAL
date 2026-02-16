import { Redirect } from 'expo-router';

export default function Index() {
  // Later you can add logic here to check if user is logged in
  // For now, always redirect to login
  return <Redirect href="/(auth)/register" />;
}