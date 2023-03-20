
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput
} from "react-native";

export default function App() {

  return (
      <View style={styles.container}>
        <ImageBackground style={styles.image}
        source={require('./images/photoGround.jpg')}>
          <View style={styles.menu}>
          <TextInput style={styles.input} textAlign={'center'}/>
        <Text style={styles.text}>Start work</Text>
          </View>
        
        </ImageBackground>
        
        
      </View>
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
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "flex-end",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  input: {
borderWidth: 1,
marginHorizontal: 50,
height: 40,
borderRadius: 15,
borderColor: 'red'
  }, 
  text: {
    color: "black",
    fontSize: 45,
    textAlign: 'center',
  }
});

