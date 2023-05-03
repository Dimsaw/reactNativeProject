import React from "react";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from './redux/dashboard/store'

import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./routing/routing";



import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";




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
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Navigation />
      </NavigationContainer>
    </Provider>

  );
}
