import React from "react";
import { useCallback, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./routing/routing";

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
    <NavigationContainer onLayout={onLayoutRootView}>
      <Navigation />
    </NavigationContainer>
  );
}
