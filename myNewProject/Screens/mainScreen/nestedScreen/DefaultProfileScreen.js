import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

const DefaultProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoProfile}>
                <Image
                    style={styles.avatar}
                    source={require("../../../images/smallAvatar.jpg")}
                />
                <View style={styles.athorInfo}>
                    <Text style={styles.name}>Natalia Romanova</Text>
                    <Text style={styles.email}>email@example.com</Text>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnCamera} onPress={() => navigation.navigate("MapScreen")}>
                    <Text>Go to map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCamera} onPress={() => navigation.navigate("CommentsScreen")}>
                    <Text>Go to comments</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DefaultProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",

        paddingLeft: 16,
        paddingRight: 16,
    },
    infoProfile: {
        flexDirection: "row",
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
    btnContainer: {
        paddingTop: 16
    }
});


// import React from "react";
// import { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     Image,
// } from "react-native";


// import { Camera, CameraType } from "expo-camera";
// import MapView from "react-native-maps";
// import * as MediaLibrary from "expo-media-library";
// import * as Location from "expo-location";

// import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

// // import { Ionicons } from "@expo/vector-icons";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// // const BottomTabs = createBottomTabNavigator();

// const DefaultProfileScreen = ({ route, navigation }) => {
//     const [camera, setCamera] = useState(null);
//     const [photo, setPhoto] = useState(null);

//     const takePhoto = async () => {
//         const photo = await camera.takePictureAsync();
//         const location = await Location.getCurrentPositionAsync();
//         console.log("location", location);
//         setPhoto(photo.uri);
//         console.log("photo", photo);
//     };

//     const sendPhoto = () => {
//         navigation.navigate("ProfileScreen");
//     };

//     return (

//         <View style={styles.container}>
//             <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
//                 <Text>Map</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen")}>
//                 <Text>Comment</Text>
//             </TouchableOpacity>
//         </View>


//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//         fontFamily: "Roboto-Regular",
//     },
//     camera: {
//         marginTop: 32,
//         marginRight: 16,
//         marginLeft: 16,
//         borderRadius: 8,
//         height: 240,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     foto: {},
//     btnContainer: {
//         width: 60,
//         height: 60,
//         borderColor: "#FFFFFF",
//         borderWidth: 1,
//         borderRadius: "50%",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FFFFFF",
//     },
//     btnCamera: {},
//     addFoto: {
//         marginLeft: 16,
//         marginTop: 8,
//     },
//     takePhotoContainer: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         borderColor: "#fff",
//         borderWidth: 1,
//     },
//     input: {
//         borderBottomWidth: 1,
//         height: 50,
//         borderRadius: 8,
//         borderColor: "#E8E8E8",
//         marginHorizontal: 16,
//         marginBottom: 16,
//         paddingLeft: 16,
//     },
//     textLocation: {
//         paddingLeft: 6,
//     },
//     pointLocation: {
//         borderBottomWidth: 1,
//         height: 50,
//         borderRadius: 8,
//         borderColor: "#E8E8E8",
//         marginHorizontal: 16,
//         marginBottom: 16,

//         flexDirection: "row",

//         paddingTop: 15,
//     },

//     btn: {
//         borderWidth: 1,
//         height: 50,
//         borderRadius: 100,
//         backgroundColor: "#F6F6F6",
//         borderColor: "#ffffff",
//         marginHorizontal: 16,
//         marginTop: 27,
//         marginBottom: 16,
//         paddingLeft: 16,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     btnText: {
//         color: "#BDBDBD",
//         fontSize: 16,
//     },
//     btnDelete: {
//         flex: 1,
//         flexDirection: "column-reverse",
//         alignItems: "center",
//     },
//     btnTrashBin: {
//         justifyContent: "center",
//         alignItems: "center",
//         width: 70,
//         height: 40,
//         backgroundColor: "#F6F6F6",
//         borderRadius: 20,
//         marginBottom: 36,
//     },
// });

// export default DefaultProfileScreen;
