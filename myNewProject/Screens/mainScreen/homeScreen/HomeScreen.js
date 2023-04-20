import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import {
  SimpleLineIcons,
  Feather,
  Octicons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import CreatePostsScreen from '../createPostsScreen/CreatePostsScreen.js';
import PostsScreen from '../postsScreen/PostsScreen';
import ProfileScreen from '../profileScreen/ProfileScreen';

const BottomTabs = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {


  return (
    <BottomTabs.Navigator initialRouteName="PostsScreen"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <BottomTabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitle: "Post",
          headerTitleAlign: "center",

          headerRight: () => (
            <TouchableOpacity
              style={styles.exit}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
          ),

          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
        }} name='PostsScreen' component={PostsScreen}
      />
      <BottomTabs.Screen
        options={{
          headerTitle: "Create a post",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('PostsScreen')}>
              <AntDesign name="arrowleft" size={24} color="black" />

            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
          tabBarVisible: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }} name='CreatePostsScreen' component={CreatePostsScreen}
      />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Octicons name="person" size={size} color={color} />
          ),
        }} name='ProfileScreen' component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  athorInfo: {
    flex: 1,
    marginLeft: 8,
    marginTop: 50,
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginTop: 32,
  },
  name: {
    color: "#212121",
  },
  email: {
    color: "#212121",
    opacity: 0.8,
  },
});

export default HomeScreen;

