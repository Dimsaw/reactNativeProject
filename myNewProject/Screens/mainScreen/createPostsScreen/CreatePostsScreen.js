import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Alert
} from 'react-native';

import { FontAwesome5, Feather } from '@expo/vector-icons';
import { v4 as uuidv4 } from "uuid";

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import { storage, firestore } from '../../../firebase/config';

const CreatePostsScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const { nickName, userId } = useSelector(state => state.auth);
  const [isDisabledPublish, setIsDisabledPublish] = useState(false);

  const [titleLocation, setTitleLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [titleBorderColor, setTitleBorderColor] = useState(false);
  const [titleBackgroundColor, setTitleBackgroundColor] = useState(false);
  const [titleLocationBorderColor, setTitleLocationBorderColor] = useState(false);
  const [titleLocationBackgroundColor, setTitleLocationBackgroundColor] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    photo && title && location
      ? setIsDisabledPublish(true)
      : setIsDisabledPublish(false);
  }, [title, location, photo]);

  const uploadPhotoToServer = async () => {
    const res = await fetch(photo);
    const file = await res.blob();
    const uniqId = uuidv4();
    const imageRef = ref(storage, `postImages/${uniqId}`);
    await uploadBytes(imageRef, file);
    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };


  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      const { coords } = await Location.getCurrentPositionAsync();
      await MediaLibrary.createAssetAsync(uri);
      setCoords(coords);
      setPhoto(uri);
      console.log("photo", uri);
      console.log("coords", coords);
    }
  };

  const sendPost = () => {
    if (!photo || !title || !location) {
      alert('Please fill in all fields!');
      return;
    }

    uploadPostToServer();
    navigation.navigate('DefaultScreen');
  };

  const uploadPostToServer = async () => {
    const createdAt = uuidv4()
    const photo = await uploadPhotoToServer();

    await addDoc(collection(firestore, `posts`), {
      photo,
      title,
      location,
      coords,
      nickName,
      userId,
      createdAt,
      likedBy: [],
    });
    resetPost()
  };

  const resetPost = () => {
    setPhoto(null);
    setTitle('');
    setLocation('');
    setCoords(null);
  };

  const changeType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No camera access</Text>;
  }



  // const sendPost = () => {
  //   setIsShowKeyboard(false);
  //   Keyboard.dismiss();
  //   // console.log("title:", title);
  //   const post = {
  //     photo,
  //     title,
  //     titleLocation,
  //     location,
  //   }
  //   // console.log(post)
  //   navigation.navigate("DefaultProfileScreen", post)
  //   setPhoto("");
  //   setTitle("");
  //   setTitleLocation("")
  //   setLocation(null);
  // };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     // console.log("latitude",location.coords.latitude)
  //     // console.log("longitude",location.coords.longitude)

  //   })();
  // }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (

    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, marginVertical: isShowKeyboard ? -30 : 0, }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' && 'padding'}
        >
          <View style={styles.cameraWrapper}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={takePhoto}
                onLongPress={changeType}
              >
                <FontAwesome5 name="camera" size={24} color="white" />
              </TouchableOpacity>
            </Camera>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
          </View>
          <Text style={styles.cameraLabel}>
            {photo ? 'Edit photo' : 'Upload a photo'}
          </Text>
          {/* const checkKeyboardPassword = () => {
            setIsShowKeyboard(true);
          setIsFocusedPassword(true);

  };
  const checkKeyboardEmail = () => {
            setIsShowKeyboard(true);
          setIsFocusedEmail(true)
  }; */}

          <View style={{
            ...styles.form,
            marginVertical: isShowKeyboard ? -30 : 0,
          }}>
            <TextInput
              style={{
                ...styles.titleInput,
                borderColor: titleBorderColor ? "#FF6C00" : "#F6F6F6",
                backgroundColor: titleBackgroundColor ? 'transparent' : '#F6F6F6'
              }}
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="Namе..."
              placeholderTextColor="#BDBDBD"
              onChangeText={value => setTitle(value)}
              value={title}
              onFocus={() => {
                setTitleBorderColor(true);
                setTitleBackgroundColor(true);
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setTitleBackgroundColor(false);
                setTitleBorderColor(false);
                setIsShowKeyboard(false)
              }}
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={{
                  ...styles.locationInput,
                  borderColor: titleLocationBorderColor ? "#FF6C00" : "#F6F6F6",
                  backgroundColor: titleLocationBackgroundColor ? 'transparent' : '#F6F6F6'
                }}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="Location..."
                placeholderTextColor="#BDBDBD"
                onChangeText={value => setLocation(value)}
                value={location}
                onFocus={() => {
                  setTitleLocationBackgroundColor(true);
                  setTitleLocationBorderColor(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setTitleLocationBorderColor(false);
                  setTitleLocationBackgroundColor(false);
                  setIsShowKeyboard(false)
                }}
              />
              <Feather
                style={styles.locationIcon}
                name="map-pin"
                size={24}
                color="black"
              />
            </View>

            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: isDisabledPublish ? '#FF6C00' : '#F6F6F6',
              }}
              activeOpacity={0.9}
              onPress={sendPost}
            >
              <Text
                style={{
                  ...styles.btnLabel,
                  color: isDisabledPublish ? '#FFFFFF' : '#BDBDBD',
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>

          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={resetPost}
              style={{
                ...styles.trashBtn,
                backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
                marginBottom: isShowKeyboard ? 0 : 32,
              }}
            >
              <Feather
                name="trash"
                size={24}
                color={photo ? '#ffffff' : '#bdbdbd'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
};


//   <TouchableWithoutFeedback onPress={keyboardHide}>
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
//       <View
//         style={{
//           ...styles.form,
//           marginBottom: isShowKeyboard ? -90 : 179,
//         }}
//       >
//         <View>
//           <TextInput
//             style={{
//               ...styles.input,
//               borderColor: titleBorderColor,
//               backgroundColor: titleBackgroundColor,
//             }}
//             value={title}
//             onChangeText={(value) => setTitle(value)}
//             placeholder={"Title"}
//             onFocus={() => {
//               setTitleBorderColor("#FF6C00");
//               setTitleBackgroundColor("transparent");
//               setIsShowKeyboard(true);
//             }}
//             onBlur={() => {
//               setTitleBackgroundColor("#F6F6F6");
//               setTitleBorderColor("#E8E8E8");
//             }}
//           />
//         </View>
//         <View>

//           <TextInput

//             style={{
//               ...styles.input,
//               borderColor: titleLocationBorderColor,
//               backgroundColor: titleLocationBackgroundColor,
//             }}
//             value={titleLocation}
//             onChangeText={(value) => setTitleLocation(value)}
//             placeholder={" Location"}
//             onFocus={() => {
//               setTitleLocationBorderColor("#FF6C00");
//               setTitleLocationBackgroundColor("transparent");
//               setIsShowKeyboard(true);
//             }}
//             onBlur={() => {
//               setTitleLocationBackgroundColor("#F6F6F6");
//               setTitleLocationBorderColor("#E8E8E8");
//             }}
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.btn}
//           activeOpacity={0.7}
//           onPress={sendPost}
//         >
//           <Text style={styles.btnTitle}>Publish</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </TouchableWithoutFeedback>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  cameraWrapper: {
    alignSelf: 'center',
    position: 'relative',
    height: 240,
    width: 360,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },

  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  photo: {
    position: 'absolute',
    zIndex: 15,
    height: '100%',
    width: '100%',
  },

  cameraLabel: {
    marginLeft: 16,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#bdbdbd',
  },

  form: {
    marginHorizontal: 16,

  },

  titleInput: {
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
  },

  locationInput: {
    height: 50,
    paddingLeft: 28,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
  },

  locationIcon: {
    position: 'absolute',
    top: 16,
    color: '#bdbdbd',
  },

  btn: {
    height: 51,
    marginTop: 43,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLabel: {
    color: '#f0f8ff',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
  },

  trashBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});


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

export default CreatePostsScreen;




