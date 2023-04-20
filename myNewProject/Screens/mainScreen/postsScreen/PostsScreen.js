import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";

const PostsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={require("../../../images/avatar.jpeg")}
            />
            <View style={styles.athorInfo}>
                <Text style={styles.name}>Natalia Romanova</Text>
                <Text style={styles.email}>email@example.com</Text>
            </View>
        </View>
    );
};

export default PostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        paddingLeft: 16,
        paddingRight: 16,
    },
    athorInfo: {
        flex: 1,
        marginLeft: 8,
        marginTop: 50,
    },
    avatar: {
        borderRadius: 16,
        width: 60,
        height: 60,
        marginTop: 32,
    },
    name: {
        color: "#212121",
    },
    email: {
        color: "#212121",
        opacity: 0.8,
    },
});
