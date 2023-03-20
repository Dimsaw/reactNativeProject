
import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

export default function App() {

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Start work</Text>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30
  },
  text: {
    color: "red",
    fontSize: 50,
  }
});

