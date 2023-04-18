import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Image } from "react-native";

import {
  SimpleLineIcons,
  Feather,
  Octicons,
  Ionicon,
  AntDesign,
} from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
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

          headerRight: ({ }) => (
            <TouchableOpacity
              style={styles.exit}
              onPress={() => navigation.navigate("login")}
            >
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
          ),

          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        options={{
          headerTitle: "Create a post",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity style={styles.backBtn} onPress={back}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          ),

          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Octicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
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
