import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import {
  Image, Keyboard, StyleSheet, Text, TextInput,
  TouchableWithoutFeedback, View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


// import { Ionicons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const BottomTabs = createBottomTabNavigator();

const CreatePostsScreen = ({ route, navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [titleLocation, setTitleLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [titleBorderColor, setTitleBorderColor] = useState("#E8E8E8");
  const [titleBackgroundColor, setTitleBackgroundColor] = useState("#F6F6F6");
  const [titleLocationBorderColor, setTitleLocationBorderColor] = useState("#E8E8E8");
  const [titleLocationBackgroundColor, setTitleLocationBackgroundColor] = useState("#F6F6F6");


  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    // console.log("location", location);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPost = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log("title:", title);
    const post = {
      photo,
      title,
      titleLocation,
      location,
    }
    // console.log(post)
    navigation.navigate("DefaultScreen", post)
    setPhoto("");
    setTitle("");
    setTitleLocation("")
    setLocation(null);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("latitude",location.coords.latitude)
      // console.log("longitude",location.coords.longitude)

    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200 }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={takePhoto}
            ref={setCamera}
            style={styles.snapContainer}
          >
            <Text style={styles.snap}>SNAP</Text>
          </TouchableOpacity>
        </Camera>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? -90 : 179,
          }}
        >
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: titleBorderColor,
                backgroundColor: titleBackgroundColor,
              }}
              value={title}
              onChangeText={(value) => setTitle(value)}
              placeholder={"Title"}
              onFocus={() => {
                setTitleBorderColor("#FF6C00");
                setTitleBackgroundColor("transparent");
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setTitleBackgroundColor("#F6F6F6");
                setTitleBorderColor("#E8E8E8");
              }}
            />
          </View>
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: titleLocationBorderColor,
                backgroundColor: titleLocationBackgroundColor,
              }}
              value={titleLocation}
              onChangeText={(value) => setTitleLocation(value)}
              placeholder={"Location"}
              onFocus={() => {
                setTitleLocationBorderColor("#FF6C00");
                setTitleLocationBackgroundColor("transparent");
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setTitleLocationBackgroundColor("#F6F6F6");
                setTitleLocationBorderColor("#E8E8E8");
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={sendPost}
          >
            <Text style={styles.btnTitle}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  takePhotoContainer: {
    borderColor: "green",
    borderWidth: 1,
  },
  snapContainer: {
    borderRadius: 50,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 20,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    color: "#212121",
    padding: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    marginTop: 43,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;

//   return (

//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         {photo && (
//           <View style={styles.takePhotoContainer}>
//             <Image
//               source={{ uri: photo }}
//               style={{ height: 200, width: 200 }}
//             />
//           </View>
//         )}
//         <View style={styles.btnContainer}>
//           <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
//             <FontAwesome name="camera" size={24} color="#BDBDBD" />
//           </TouchableOpacity>
//         </View>
//       </Camera>
//       <TouchableOpacity activeOpacity={0.5} style={styles.addFoto}>
//         <Text style={styles.btnText}>Upload a photo</Text>
//       </TouchableOpacity>

//       <TextInput style={styles.input} textAlign={"left"} placeholder="Name" />

//       <TouchableOpacity style={styles.pointLocation} activeOpacity={0.5} onPress={() => navigation.navigate("MapScreen")}>
//         <Feather name="map-pin" size={24} color="#BDBDBD" />
//         <View style={styles.textLocation}>
//           <Text style={styles.btnText}>Location</Text>
//         </View>

//       </TouchableOpacity>

//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={styles.btn}
//         onPress={sendPhoto}
//       >
//         <Text style={styles.btnText}>Publish</Text>
//       </TouchableOpacity>
//       <View style={styles.btnDelete}>
//         <TouchableOpacity style={styles.btnTrashBin} activeOpacity={0.5}>
//           <Ionicons name="trash-bin-outline" size={24} color="#BDBDBD" />
//         </TouchableOpacity>
//       </View>
//     </View>

//     // </BottomTabs.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     fontFamily: "Roboto-Regular",
//   },
//   camera: {
//     marginTop: 32,
//     marginRight: 16,
//     marginLeft: 16,
//     borderRadius: 8,
//     height: 240,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   foto: {},
//   btnContainer: {
//     width: 60,
//     height: 60,
//     borderColor: "#FFFFFF",
//     borderWidth: 1,
//     borderRadius: "50%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   btnCamera: {},
//   addFoto: {
//     marginLeft: 16,
//     marginTop: 8,
//   },
//   takePhotoContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     borderColor: "#fff",
//     borderWidth: 1,
//   },
//   input: {
//     borderBottomWidth: 1,
//     height: 50,
//     borderRadius: 8,
//     borderColor: "#E8E8E8",
//     marginHorizontal: 16,
//     marginBottom: 16,
//     paddingLeft: 16,
//   },
//   textLocation: {
//     paddingLeft: 6,
//   },
//   pointLocation: {
//     borderBottomWidth: 1,
//     height: 50,
//     borderRadius: 8,
//     borderColor: "#E8E8E8",
//     marginHorizontal: 16,
//     marginBottom: 16,

//     flexDirection: "row",

//     paddingTop: 15,
//   },

//   btn: {
//     borderWidth: 1,
//     height: 50,
//     borderRadius: 100,
//     backgroundColor: "#F6F6F6",
//     borderColor: "#ffffff",
//     marginHorizontal: 16,
//     marginTop: 27,
//     marginBottom: 16,
//     paddingLeft: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnText: {
//     color: "#BDBDBD",
//     fontSize: 16,
//   },
//   btnDelete: {
//     flex: 1,
//     flexDirection: "column-reverse",
//     alignItems: "center",
//   },
//   btnTrashBin: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 70,
//     height: 40,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 20,
//     marginBottom: 36,
//   },
// });

// export default CreatePostsScreen;




