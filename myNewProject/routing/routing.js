import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";

import Registration from "../screens/authScreen/registrationScreen/RegistrationScreen";
import Login from "../screens/authScreen/loginScreen/LoginScreen";
import PostsScreen from "../screens/mainScreen/postsScreen/PostsScreen";
import CreatePostsScreen from "../screens/mainScreen/createPostsScreen/CreatePostsScreen";
import ProfileScreen from "../screens/mainScreen/profileScreen/ProfileScreen";

import Header from "../components/Header/header";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Registration" component={Registration} />
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          alignItems: "center",
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: "center",
            marginRight: 16,
            marginTop: 10,
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="grid" size={size} color={color} />;
          },
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          unmountOnBlur: true,
          headerTitle: "Create Post",
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: "center",
            marginRight: 16,
            marginTop: 10,
          },
          header: ({ route, options, navigation }) => {
            const back = {
              title: "Post",
            };
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back={back} />;
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="plus" size={size} color={color} />;
          },
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 10,
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
