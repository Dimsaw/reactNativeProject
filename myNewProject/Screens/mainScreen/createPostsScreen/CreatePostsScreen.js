import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import MapView from "react-native-maps";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

// import { Ionicons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const BottomTabs = createBottomTabNavigator();

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    // <BottomTabs.Navigator>
    //   <BottomTabs.Screen>
    //   </BottomTabs.Screen>

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
      <TouchableOpacity activeOpacity={0.5} style={styles.addFoto}>
        <Text style={styles.btnText}>Upload a photo</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} textAlign={"left"} placeholder="Name" />

      <TouchableOpacity style={styles.pointLocation} activeOpacity={0.5}>
        <Feather name="map-pin" size={24} color="#BDBDBD" />
        <View style={styles.textLocation}>
          <Text style={styles.btnText}>Location</Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
        onPress={sendPhoto}
      >
        <Text style={styles.btnText}>Publish</Text>
      </TouchableOpacity>
      <View style={styles.btnDelete}>
        <TouchableOpacity style={styles.btnTrashBin} activeOpacity={0.5}>
          <Ionicons name="trash-bin-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>

    // </BottomTabs.Navigator>
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
    alignItems: "center",
  },
  foto: {},
  btnContainer: {
    width: 60,
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
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
  textLocation: {
    paddingLeft: 6,
  },
  pointLocation: {
    borderBottomWidth: 1,
    height: 50,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,

    flexDirection: "row",

    paddingTop: 15,
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
  btnDelete: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  btnTrashBin: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginBottom: 36,
  },
});

export default CreatePostsScreen;
