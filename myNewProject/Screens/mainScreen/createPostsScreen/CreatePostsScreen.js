import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";

import { FontAwesome5, Feather } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { storage, db } from "../../../firebase/config";

const CreatePostsScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const { login, userId } = useSelector((state) => state.auth);
  const [isDisabledPublish, setIsDisabledPublish] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [titleBorderColor, setTitleBorderColor] = useState(false);
  const [titleBackgroundColor, setTitleBackgroundColor] = useState(false);
  const [titleLocationBorderColor, setTitleLocationBorderColor] =
    useState(false);
  const [titleLocationBackgroundColor, setTitleLocationBackgroundColor] =
    useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    photo && title && location
      ? setIsDisabledPublish(true)
      : setIsDisabledPublish(false);
  }, [title, location, photo]);

  const uploadPhotoToServer = async () => {
    try {
      const res = await fetch(photo);
      console.log("res", res);
      const file = await res.blob();
      const uniqId = uuidv4();
      const imageRef = ref(storage, `postImages/${uniqId}`);
      console.log("imageRef", imageRef);
      await uploadBytes(imageRef, file);
      const processedPhoto = await getDownloadURL(imageRef);
      console.log("processedPhoto", processedPhoto);
      return processedPhoto;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const takePhoto = async () => {
    try {
      if (camera) {
        const { uri } = await camera.takePictureAsync();
        const { coords } = await Location.getCurrentPositionAsync();
        await MediaLibrary.createAssetAsync(uri);
        setCoords(coords);
        setPhoto(uri);
        console.log("photo", uri);
        console.log("coords", coords);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const createdAt = uuidv4();
      const photo = await uploadPhotoToServer();

      await addDoc(collection(db, `posts`), {
        photo,
        title,
        location,
        coords,
        login,
        userId,
        createdAt,
        likedBy: [],
      });
      resetPost();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const resetPost = () => {
    setPhoto(null);
    setTitle("");
    setLocation("");
    setCoords(null);
  };

  const changeType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No camera access</Text>;
  }

  const sendPost = () => {
    if (!photo || !title || !location) {
      alert("Please fill in all fields!");
      return;
    }

    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{
          ...styles.container,
          marginVertical: isShowKeyboard ? -30 : 0,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" && "padding"}
        >
          <View style={styles.cameraWrapper}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={takePhoto}
                onLongPress={changeType}
              >
                <FontAwesome5 name="camera" size={24} color="white" />
              </TouchableOpacity>
            </Camera>
            {photo && (
              <Image
                source={{ uri: photo }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  borderColor: "red",
                }}
              />
            )}
          </View>
          <Text style={styles.cameraLabel}>
            {photo ? "Edit photo" : "Upload a photo"}
          </Text>

          <View
            style={{
              ...styles.form,
              marginVertical: isShowKeyboard ? -30 : 0,
            }}
          >
            <TextInput
              style={{
                ...styles.titleInput,
                borderColor: titleBorderColor ? "#FF6C00" : "#F6F6F6",
                backgroundColor: titleBackgroundColor
                  ? "transparent"
                  : "#F6F6F6",
              }}
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="Namе..."
              placeholderTextColor="#BDBDBD"
              onChangeText={(value) => setTitle(value)}
              value={title}
              onFocus={() => {
                setTitleBorderColor(true);
                setTitleBackgroundColor(true);
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setTitleBackgroundColor(false);
                setTitleBorderColor(false);
                setIsShowKeyboard(false);
              }}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  ...styles.locationInput,
                  borderColor: titleLocationBorderColor ? "#FF6C00" : "#F6F6F6",
                  backgroundColor: titleLocationBackgroundColor
                    ? "transparent"
                    : "#F6F6F6",
                }}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="Location..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(value) => setLocation(value)}
                value={location}
                onFocus={() => {
                  setTitleLocationBackgroundColor(true);
                  setTitleLocationBorderColor(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setTitleLocationBorderColor(false);
                  setTitleLocationBackgroundColor(false);
                  setIsShowKeyboard(false);
                }}
              />
              <Feather
                style={styles.locationIcon}
                name="map-pin"
                size={24}
                color="black"
              />
            </View>

            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: isDisabledPublish ? "#FF6C00" : "#F6F6F6",
              }}
              activeOpacity={0.9}
              onPress={sendPost}
            >
              <Text
                style={{
                  ...styles.btnLabel,
                  color: isDisabledPublish ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={resetPost}
              style={{
                ...styles.trashBtn,
                backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                marginBottom: isShowKeyboard ? 0 : 32,
              }}
            >
              <Feather
                name="trash"
                size={24}
                color={photo ? "#ffffff" : "#bdbdbd"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  cameraWrapper: {
    alignSelf: "center",
    position: "relative",
    height: 240,
    width: 360,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },

  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  photoBtn: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  photo: {
    position: "absolute",
    zIndex: 15,
    height: "100%",
    width: "100%",
  },

  cameraLabel: {
    marginLeft: 16,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#bdbdbd",
  },

  form: {
    marginHorizontal: 16,
  },

  titleInput: {
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    borderBottomWidth: 1,
  },

  locationInput: {
    height: 50,
    paddingLeft: 28,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    borderBottomWidth: 1,
  },

  locationIcon: {
    position: "absolute",
    top: 16,
    color: "#bdbdbd",
  },

  btn: {
    height: 51,
    marginTop: 43,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  btnLabel: {
    color: "#f0f8ff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },

  trashBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
