
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput, 
  Button
} from "react-native";

export default function App() {

  return (
      <View style={styles.container}>
        <ImageBackground style={styles.image}
        source={require('./images/photoGround.jpg')}>
         
         <View style={styles.menu}>
          <Text style={styles.text}> Registration</Text>
         <View style={styles.form}>
         <TextInput style={styles.input} textAlign={'left'}/>
          <TextInput style={styles.input} textAlign={'left'}/>
          <TextInput style={styles.input} textAlign={'left'} secureTextEntry={true}/>
         </View>
          
        
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
  menu: {
    
    backgroundColor: '#FFFFFF',
    borderColor: 'green',
   
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

//   input: {
//     flex: 1,
// borderWidth: 1,
// marginHorizontal: 50,
// height: 50,
// borderRadius: 8,
// backgroundColor: '#F6F6F6',
// borderColor: '#E8E8E8'
//   }, 
  text: {
    color: "#212121",
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 90,
    
  }
});

