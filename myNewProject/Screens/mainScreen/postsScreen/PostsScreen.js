import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";


const PostsScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
        </View>
        // <SafeAreaView style={{ justifyContent: "flex-start", alignItems: "center", overflow: "visible" }}>
        //     <ScrollView>
        //         <View style={styles.container}>
        //             <View style={styles.imageBox}></View>
        //             <TextInput style={styles.input} textAlign={"left"} placeholder="Name" />
        //         </View>
        //     </ScrollView>
        // </SafeAreaView>
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