import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/avatar.jpeg')}/>
      <Text>CreatePostsScreen</Text>
      
    </View>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export default HomeScreen;