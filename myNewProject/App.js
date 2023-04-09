import React from 'react';
import { useCallback } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Registration from "./Screens/RegistrationScreen/RegistrationScreen";
import Login from "./Screens/LoginScreen/LoginScreen";



export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
    "Roboto-Regular": require('./fonts/Roboto-Regular.ttf')
  });



  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <Registration onLayout={onLayoutRootView} />
    <Login onLayout={onLayoutRootView}/>
  )
}