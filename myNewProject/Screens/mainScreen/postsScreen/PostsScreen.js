import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";


const PostsScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
        </View>

    );
};

export default PostsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#FFFFFF",
        fontFamily: "Roboto-Regular",
    }
})