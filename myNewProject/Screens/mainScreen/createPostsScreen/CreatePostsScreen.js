import React from "react";
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import { FontAwesome } from "@expo/vector-icons";

// import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "../../../routing/routing";

const BottomTabs = createBottomTabNavigator();

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    navigation.navigate('ProfileScreen')
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

      </Camera>
      <TouchableOpacity activeOpacity={0.5} style={styles.addFoto} >
        <Text style={styles.btnText}>Upload a photo</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} textAlign={"left"} placeholder="Name" />
      <TextInput
        style={styles.input}
        textAlign={"left"}
        placeholder="Password"
      />
      <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={sendPhoto}>
        <Text style={styles.btnText}>Publish
        </Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  camera: {
    marginTop: 32,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 8,
    height: 240,
    justifyContent: "center",
    alignItems: 'center',
  },
  foto: {},
  btnContainer: {

    width: 60,
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  btnCamera: {},
  addFoto: {
    marginLeft: 16,
    marginTop: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
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
