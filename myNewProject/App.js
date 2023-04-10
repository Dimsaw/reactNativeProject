import React from "react";
import { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Registration from "./screens/registrationScreen/RegistrationScreen";
import Login from "./screens/loginScreen/LoginScreen";
import PostsScreen from "./screens/mainScreen/postsScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/createPostsScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/profileScreen/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Registration">
        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <AuthStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }}/>
      <MainTab.Screen name="Create" component={CreatePostsScreen} options={{ headerShown: false }}/>
      <MainTab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </MainTab.Navigator>
  );
};

export default function App() {
  const routing = useRoute(null);
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
    <NavigationContainer >
     {routing}
    </NavigationContainer>
  );
}
