import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from "react-native";

import styles from "./registartion.styled";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../../firebase/config";

import { authSignUpUser } from "../../../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
  nickname: "",
  avatar: null,
};

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

function Registration({ navigation }) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState({ ...initialState });

  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const pickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setState((prevState) => ({
          ...prevState,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const deleteAvatar = () => {
    setState((prevState) => ({
      ...prevState,
      avatar: null,
    }));
  };

  const uploadPhotoToServer = async () => {
    try {
      let imageRef;
      if (state.avatar) {
        const res = await fetch(state.avatar);
        console.log('res', res);
        const file = await res.blob();
        console.log('file', file);
        const uniqId = uuidv4();
        imageRef = ref(storage, `userAvatars/${uniqId}`);
        await uploadBytes(imageRef, file);
      } else {
        imageRef = ref(storage, `userAvatars/avatar_placeholder.jpg`);
        console.log("imageRef2", imageRef);
      }

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const touchSreen = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const checkKeyboardLogin = () => {
    setIsShowKeyboard(true);
    setIsFocusedLogin(true);
  };
  const checkKeyboardEmail = () => {
    setIsShowKeyboard(true);
    setIsFocusedEmail(true);
  };

  const checkKeyboardPassword = () => {
    setIsShowKeyboard(true);
    setIsFocusedPassword(true);
  };

  const submitForm = async () => {
    try {
      if (
        !state.email.trim() ||
        !state.password.trim() ||
        !state.login.trim()
      ) {
        return alert("Please, fill all!");
      }
      dispatch(authSignUpUser({ ...state }));

      const photo = await uploadPhotoToServer();
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      setState("");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ ...styles.container }}
    >
      <TouchableWithoutFeedback onPress={touchSreen}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            style={{
              ...styles.image,
              width: windowWidth,
              height: windowHeight,
            }}
            source={require("../../../images/photoGround.jpg")}
          >
            <View
              style={{
                ...styles.menu,
                width: windowWidth,
                marginBottom: isShowKeyboard ? -170 : 0,
              }}
            >
              {state.avatar ? (
                <>
                  <View
                    style={{
                      ...styles.imageThumb,
                      left: (windowWidth - 120) / 2,
                    }}
                  >
                    <Image
                      style={styles.avatarImage}
                      source={{ uri: state.avatar }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={deleteAvatar}
                    style={{
                      ...styles.addButton,
                      left: windowWidth / 2 + 47.5,
                    }}
                  >
                    <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View
                    style={{
                      ...styles.imageThumb,
                      left: (windowWidth - 120) / 2,
                    }}
                  ></View>
                  <TouchableOpacity
                    onPress={pickAvatar}
                    style={{
                      ...styles.addButton,
                      left: windowWidth / 2 + 47.5,
                    }}
                  >
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                </>
              )}
              <Text style={styles.text}> Registration</Text>
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setIsFocusedLogin(false)}
                  cursorColor={"#BDBDBD"}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                  textAlign={"left"}
                  placeholder="Login"
                  onFocus={checkKeyboardLogin}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setIsFocusedEmail(false)}
                  cursorColor={"#BDBDBD"}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  textAlign={"left"}
                  placeholder="Email"
                  onFocus={checkKeyboardEmail}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setIsFocusedPassword(false)}
                  cursorColor={"#BDBDBD"}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  textAlign={"left"}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Password"
                  onFocus={checkKeyboardPassword}
                />
                <TouchableOpacity
                  style={styles.toogleBtnPassword}
                  activeOpacity={0.5}
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  <Text style={styles.toogleTextPassword}>
                    {isPasswordHidden ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.boxBtn}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={submitForm}
                >
                  <Text style={styles.btnText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.linkText}>
                    Already have an account? Come in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



export default Registration;