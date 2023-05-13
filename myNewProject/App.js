import React from "react";

import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

import { useCallback } from "react";

import { store } from "./redux/dashboard/store";

import { Main } from "./components/Main/Main";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

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
      <Main onReady={onLayoutRootView} />
    </Provider>
  );
}
