import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View>
      <TextInput
        style={styles.input}
        textAlign={"left"}
        value={state.login}
        placeholder="Login"
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, login: value }))
        }
      />
      <TextInput
        style={styles.input}
        textAlign={"left"}
        value={state.email}
        placeholder="Email"
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, email: value }))
        }
      />
    </View>
  );
};

export default CreatePostsScreen;
