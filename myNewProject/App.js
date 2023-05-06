import React from "react";
import { LogBox } from 'react-native';


import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from './redux/dashboard/store'

import { Main } from './components/Main'




LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./fonts/Roboto-Regular.ttf"),
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

    <Provider store={store} onLayout={onLayoutRootView}>
      <Main />
    </Provider>

  );
}