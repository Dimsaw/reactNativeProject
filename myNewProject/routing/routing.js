import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import Registration from "../screens/registrationScreen/RegistrationScreen";
import Login from "../screens/loginScreen/LoginScreen";
import PostsScreen from "../screens/mainScreen/postsScreen/PostsScreen";
import CreatePostsScreen from "../screens/mainScreen/createPostsScreen/CreatePostsScreen";
import ProfileScreen from "../screens/mainScreen/profileScreen/ProfileScreen";
// import Home from '../screens/home/Home';

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

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
    <MainTab.Navigator tabBarOptions={{ showLabel: false, }}>
        <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ 
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitle: 'Post',
              headerTitleAlign: 'center',
              
              headerRight: () => (
                <TouchableOpacity style={styles.exit}
                  onPress={() => alert("This is a button!")}
              >
                <Ionicons name="exit-outline" size={24} color="black" />
                 </TouchableOpacity> ),
                 
            tabBarIcon: ({focused, size, color}) => (
                <SimpleLineIcons name="grid" size={size} color={color} />)}}
      />
      
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{ 
            headerTitle: 'Create a post',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity style={styles.backBtn}
                  onPress={() => alert("This is a button!")}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
                 </TouchableOpacity> ),
            
        tabBarIcon: ({focused, size, color}) => (
            <Feather name="plus" size={size} color={color} /> 
        ) }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
                <Octicons name="person" size={size} color={color} /> )}}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;


const styles = StyleSheet.create({
    exit: {
   paddingRight: 16},
   backBtn: {
    paddingLeft: 16
   }
})