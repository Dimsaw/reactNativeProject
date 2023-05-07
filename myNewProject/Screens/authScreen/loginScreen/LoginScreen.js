import React, { useState, useEffect } from "react";

import {
  StyleSheet,
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
  Button,
} from "react-native";

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
  // const [login, setLogin] = useState("");
  // const [email, setEmail] = useState("");
  const [state, setState] = useState(initialState);

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // const loginHandler = (login) => setLogin(login);
  // const emailHandler = (email) => setEmail(email);

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
    setIsFocusedEmail(true)
  };

  const submitForm = () => {
    if (!state.email || !state.password) { return alert("Please, fill all!") }
    console.log(state);
    setState('');

    navigation.navigate('HomeScreen', { screen: 'PostsScreen' })
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  menu: {
    backgroundColor: "#FFFFFF",
    borderColor: "green",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
  toogleBtnPassword: {
    position: 'absolute',
    right: 16,
    top: 80,
    paddingRight: 16,
  },
  toogleTextPassword: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  text: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
    marginTop: 32,
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
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  boxBtn: {
    paddingBottom: 145,
  }
  ,
  link: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,

  },
});