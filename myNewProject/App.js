import React from "react";
import { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Registration from "./screens/RegistrationScreen/RegistrationScreen";
import Login from "./screens/LoginScreen/LoginScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

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
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Registration">
        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
          onLayout={onLayoutRootView}
        />
        <AuthStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
          onLayout={onLayoutRootView}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
