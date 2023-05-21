import React, { useState, useEffect } from "react";
import { authSignInUser } from "../../../redux/auth/authOperation";

import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";

import styles from "./loginScreen.styled";

const initialState = {
  email: "",
  password: "",
};

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function Login({ navigation }) {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState({ ...initialState });

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  const touchSreen = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const checkKeyboardPassword = () => {
    setIsShowKeyboard(true);
    setIsFocusedPassword(true);
  };
  const checkKeyboardEmail = () => {
    setIsShowKeyboard(true);
    setIsFocusedEmail(true);
  };

  const submitForm = () => {
    if (!state.email || !state.password) {
      return alert("Please, fill all!");
    }
    console.log(state);

    dispatch(authSignInUser({ ...state }));
    setState("");
  };

  return (
    <TouchableWithoutFeedback onPress={touchSreen}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../images/photoGround.jpg")}
        >
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : 0}>
            <View
              style={{
                ...styles.menu,
                marginBottom: isShowKeyboard ? -241 : 0,
              }}
            >
              <Text style={styles.text}> Sign in</Text>
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setIsFocusedEmail(false)}
                  textAlign={"left"}
                  value={state.email}
                  placeholder="Email"
                  onFocus={checkKeyboardEmail}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setIsFocusedPassword(false)}
                  textAlign={"left"}
                  value={state.password}
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  onFocus={checkKeyboardPassword}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.link}>No account? Registration</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}


