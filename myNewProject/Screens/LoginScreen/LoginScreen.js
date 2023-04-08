import React, { useState, useEffect } from "react";
import { useCallback } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
} from "react-native";


const initialState = {
  email: '',
  password: ''
}

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Login() {

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });


  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const touchSreen = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  const submitForm = () => {
    console.log(state);
    setState(initialState);
  }

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../../fonts/Roboto-Medium.ttf'),
    "Roboto-Regular": require('../../fonts/Roboto-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={touchSreen}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground style={styles.image}
          source={require('../../images/photoGround.jpg')}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : 0}>
            <View style={{ ...styles.menu, marginBottom: isShowKeyboard ? -241 : 0 }}>

              <Text style={styles.text}> Sign in</Text>
              <View style={styles.form}>
                <TextInput style={styles.input} textAlign={'left'}
                  value={state.email} placeholder="Email"
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) =>
                    ({ ...prevState, email: value }))} />
                <TextInput style={styles.input} textAlign={'left'}
                  value={state.password} placeholder="Password" secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                />

              </View>

              <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={submitForm}>

                <Text style={styles.btnText}>Sign in</Text>
              </TouchableOpacity>

              <Text style={styles.link}> No account? Registration</Text>

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
    fontFamily: 'Roboto-Regular'


  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  menu: {
    backgroundColor: '#FFFFFF',
    borderColor: 'green',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },

  text: {
    color: "#212121",
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 32,
    fontFamily: 'Roboto-Medium'
  },

  btn: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    borderColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  link: {
    color: "#1B4371",
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 145

  }
});

