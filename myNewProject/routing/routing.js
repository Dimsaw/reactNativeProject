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
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default Navigation;



// import React from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // import { createStackNavigator } from "@react-navigation/stack";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// // const AuthStack = createStackNavigator();
// // const MainTab = createBottomTabNavigator();

// // const Stack = createNativeStackNavigator()

// import Registration from "../screens/authScreen/registrationScreen/RegistrationScreen";
// import Login from "../screens/authScreen/loginScreen/LoginScreen";
// import HomeScreen from "../screens/mainScreen/homeScreen/HomeScreen";
// import CreatePostsScreen from "../screens/mainScreen/createPostsScreen/CreatePostsScreen";
// import ProfileScreen from "../screens/mainScreen/profileScreen/ProfileScreen";

// const Stack = createNativeStackNavigator();

// export const Navigation = () => {

//   return (
//     <Stack.Navigator
//       initialRouteName="Registration"
//       screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Registration" component={Registration} />

//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//     </Stack.Navigator >
//   );
// };


// import React from "react";

// // import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

// import Registration from "../screens/authScreen/registrationScreen/RegistrationScreen";
// import Login from "../screens/authScreen/loginScreen/LoginScreen";
// import HomeScreen from "../screens/mainScreen/homeScreen/HomeScreen";
// import CreatePostsScreen from "../screens/mainScreen/createPostsScreen/CreatePostsScreen";
// import ProfileScreen from "../screens/mainScreen/profileScreen/ProfileScreen";

// const Stack = createNativeStackNavigator();

// export const useRoute = (isAuth) => {
//   console.log('isAuth', isAuth
//   );
//   if (!isAuth) {
//     <AuthStack.Navigator
//       initialRouteName="Registration"
//       screenOptions={{ headerShown: false }}
//     >
//       <AuthStack.Screen name="Login" component={Login} />
//       <AuthStack.Screen name="Registration" component={Registration} />
//     </AuthStack.Navigator>;
//   }
//   return (
//     <MainTab.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={{ headerShown: false }}
//     >
//       <MainTab.Screen name="HomeScreen" component={HomeScreen} />
//       <MainTab.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
//       <MainTab.Screen name="ProfileScreen" component={ProfileScreen} />
//     </MainTab.Navigator>
//   );
// };
