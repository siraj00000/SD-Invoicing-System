import React, { useEffect } from 'react';
import Navigation from './src/Navigation';
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Navigation />
  );
}
