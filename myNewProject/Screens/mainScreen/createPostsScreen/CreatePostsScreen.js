import React from "react";
import { useState } from "react";
import DefaultScreenPosts from '../nestedScreen/DefaultScreenPosts';
import MapScreen from '../nestedScreen/MapScreen';
import CommentsScreen from '../nestedScreen/CommentsScreen';

import { createStackNavigator } from "@react-navigation/stack";

const NestedScreen = createStackNavigator();

const CreatePostsScreen = ({ route }) => {
  // console.log(route.params)

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPosts" component={DefaultScreenPosts} options={{ headerShown: false }} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} options={{ headerShown: false }} />
    </NestedScreen.Navigator>

  );
};

export default CreatePostsScreen;
