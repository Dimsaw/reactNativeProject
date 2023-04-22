import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Registration from "../screens/authScreen/registrationScreen/RegistrationScreen";
import Login from "../screens/authScreen/loginScreen/LoginScreen";
import HomeScreen from "../screens/mainScreen/homeScreen/HomeScreen";
import CreatePostsScreen from "../screens/mainScreen/createPostsScreen/CreatePostsScreen";
import ProfileScreen from "../screens/mainScreen/profileScreen/ProfileScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Registration"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
