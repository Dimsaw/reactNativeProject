import React, { useState, useEffect } from "react";

import {
  StyleSheet,
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

import * as ImagePicker from "expo-image-picker";

import { v4 as uuidv4 } from "uuid";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../../firebase/firebase";

import { authSignUpUser } from "../../../redux/auth/authOperation";

// const initialState = {
//   login: "",
//   email: "",
//   password: "",
// };

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function Registration({ navigation }) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [state, setState] = useState(initialState);

  const [pickedImagePath, setPickedImagePath] = useState("");

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  // const pickAvatar = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setState(prevState => ({
  //       ...prevState,
  //       avatar: result.assets[0].uri,
  //     }));
  //   }
  // };

  const downloadAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert(
          "You refused to allow this app to access your photos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('resultfoto', result);


      setPickedImagePath(result.assets[0].uri);
      console.log('setPickedImagePath', setPickedImagePath);

    } catch (error) {
      console.log("error-message", error.message);
    }
  };

  const deleteAvatar = () => setPickedImagePath("");

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

  const loginHandler = (login) => setLogin(login);
  const emailHandler = (email) => setEmail(email);
  const passwordHandler = (password) => setPassword(password);

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(pickedImagePath);
      console.log('response', response);
      const file = await response.blob();
      console.log('file', file);
      const uniquePostId = uuidv4();
      // const storage = getStorage();
      const storageRef = ref(storage, `avatarImage/${uniquePostId}`);
      console.log('storageRef', storageRef);

      await uploadBytes(storageRef, file);

      const photoRef = await getDownloadURL(storageRef);
      return photoRef;
    } catch (error) {
      console.log("error-message.upoload-photo", error.message);
    }
  };
  // const uploadPhotoToServer = async () => {
  //   let imageRef;

  //   if (state.avatar) {
  //     const res = await fetch(state.avatar);
  //     const file = await res.blob();
  //     const uniqId = Date.now().toString();
  //     imageRef = ref(storage, `userAvatars/${uniqId}`);
  //     await uploadBytes(imageRef, file);
  //   } else {
  //     imageRef = ref(storage, `userAvatars/avatar_placeholder.jpg`);
  //   }

  //   const processedPhoto = await getDownloadURL(imageRef);
  //   return processedPhoto;
  // };

  // const submitForm = async () => {
  //   try {
  //     if (!login.trim() || !email.trim() || !password.trim()) {
  //       Alert.alert(`All fields must be filled`);
  //       return;
  //     }

  //     const imageRef = await uploadPhotoToServer();
  //     const newUser = {
  //       avatarImage: imageRef,
  //       login,
  //       email,
  //       password,
  //     };
  //     console.log('user', user);
  //     dispatch(authSignUpUser(newUser));
  //     setLogin("");
  //     setEmail("");
  //     setPassword("");
  //     setPickedImagePath("");
  //     Keyboard.dismiss();
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

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
    setIsFocusedEmail(true)
  };

  const checkKeyboardPassword = () => {
    setIsShowKeyboard(true);
    setIsFocusedPassword(true)
  };

  const submitForm = async () => {
    try {
      if (!email.trim() || !password.trim() || !login.trim()) { return alert("Please, fill all!") }
      // const imageRef = await uploadPhotoToServer();
      // console.log('imageRef', imageRef);

      const newUser = {
        login,
        email,
        password,
      };
      console.log('newUser', newUser);
      dispatch(authSignUpUser(newUser))

      // setState('');
      // navigation.navigate('HomeScreen', { screen: 'PostsScreen' })

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
              {pickedImagePath ? (
                <>
                  <View
                    style={{
                      ...styles.imageThumb,
                      left: (windowWidth - 120) / 2,
                    }}
                  >
                    <Image
                      style={styles.avatarImage}
                      source={{ uri: pickedImagePath }}
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
                    onPress={downloadAvatar}
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
                  onChangeText={loginHandler}
                  textAlign={"left"}
                  value={login}
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
                  onChangeText={emailHandler}
                  textAlign={"left"}
                  value={email}
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
                  onChangeText={passwordHandler}
                  textAlign={"left"}
                  secureTextEntry={isPasswordHidden}
                  value={password}
                  placeholder="Password"
                  onFocus={checkKeyboardPassword}

                />
                <TouchableOpacity style={styles.toogleBtnPassword} activeOpacity={0.5} onPress={() =>
                  setIsPasswordHidden((prevState) => !prevState)
                }>
                  <Text style={styles.toogleTextPassword}>{isPasswordHidden ? 'Show' : 'Hide'}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto-Regular",
  },
  containerMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    justifyContent: "flex-end",
    // alignItems: 'center'
  },

  imageThumb: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    top: 21,
    width: 25,
    height: 25,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },

  menu: {
    // flex: 1,
    // alignItems: "center",
    // backgroundColor: "#FFFFFF",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    // marginBottom: -50,
  },

  input: {
    // marginBottom: 16,
    // paddingHorizontal: 16,
    // paddingTop: 16,
    // paddingBottom: 15,
    // backgroundColor: "#F6F6F6",
    // height: 50,
    // borderWidth: 1,
    // borderRadius: 8,
    // color: "#212121",
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },

  text: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
    marginTop: 90,
    fontFamily: "Roboto-Medium",
  },
  btn: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    borderColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  toogleBtnPassword: {
    position: 'absolute',
    right: 16,
    top: 150,
    paddingRight: 16,
  },
  toogleTextPassword: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  boxBtn: {
    paddingBottom: 79,
  },
  linkText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
  },
});
