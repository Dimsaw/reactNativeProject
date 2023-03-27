
import React, {useState} from "react";
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
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
  TouchableWithoutFeedback
} from "react-native";

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
//   });
// };

export default function App() {
const [isShowKeyboard, setIsShowKeyboard] = useState(false);

const touchSreen = () => {
  setIsShowKeyboard(false);
  Keyboard.dismiss();

}
  return (
    <TouchableWithoutFeedback onPress={touchSreen }>
      <View style={styles.container}>
        <ImageBackground style={styles.image}
        source={require('./images/photoGround.jpg')}>
         <KeyboardAvoidingView 
         behavior={Platform.OS == "ios" ? "padding" : 0}>
         <View style={{ ...styles.menu, marginBottom: isShowKeyboard ? -70 : 0}}>
        
          <Text style={styles.text}> Registration</Text>
         <View style={styles.form}>
         <TextInput style={styles.input} textAlign={'left'} onFocus={() => setIsShowKeyboard(true)}/>
          <TextInput style={styles.input} textAlign={'left'} onFocus={() => setIsShowKeyboard(true)}/>
          <TextInput style={styles.input} textAlign={'left'} secureTextEntry={true} onFocus={() => setIsShowKeyboard(true)}/>
         
         </View>

         <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>
        
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


  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: 'center'
    
    
  },

  menu: {
    
    backgroundColor: '#FFFFFF',
    borderColor: 'green',
   
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    // marginBottom: -50,
  

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
    marginTop: 90,
    
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
  }
});

