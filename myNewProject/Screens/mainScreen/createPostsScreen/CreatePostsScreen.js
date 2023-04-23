import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { FontAwesome } from '@expo/vector-icons';

// import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const CreatePostsScreen = () => {





  return (
    <View style={styles.container}>
      <Camera>
        <TouchableOpacity>
          <FontAwesome name="camera" size={24} color="black" />
        </TouchableOpacity>
      </Camera>
      <TextInput style={styles.input} textAlign={"left"} placeholder="Name" />
      <TextInput
        style={styles.input}
        textAlign={"left"}
        placeholder="Password"
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Publish</Text>
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {

    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  imageBox: {
    width: 400,
    height: 300,
    padding: 5,
    borderColor: "red",
  },
  input: {
    borderBottomWidth: 1,
    height: 50,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
  btn: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
});

export default CreatePostsScreen;
