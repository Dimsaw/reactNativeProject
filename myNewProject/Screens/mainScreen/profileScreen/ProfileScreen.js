import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  collectionGroup,
  updateDoc,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

import PostItem from "../../../components/postItem/postItem";
import {
  authSignOutUser,
  updateUserAvatar,
} from "../../../redux/auth/authOperation";
import { db, storage } from "../../../firebase/config";
import UserAvatar from "../../../components/userAvatar/userAvatar";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const userQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    onSnapshot(userQuery, (data) =>
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const updateUserComments = async (avatar) => {
    const userQuery = query(
      collectionGroup(db, "comments"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        avatar,
      });
    });
  };

  const uploadPhotoToServer = async (avatar) => {
    let imageRef;

    if (avatar) {
      const res = await fetch(avatar);
      const file = await res.blob();
      const uniqId = uuidv4();
      imageRef = ref(storage, `userAvatars/${uniqId}`);
      await uploadBytes(imageRef, file);
    } else {
      imageRef = ref(storage, `userAvatars/avatar_placeholder.jpg`);
    }

    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const photo = await uploadPhotoToServer(result.assets[0].uri);
      await updateUserComments(photo);
      dispatch(updateUserAvatar(photo));
    }
  };

  const removeAvatar = async () => {
    const photo = await uploadPhotoToServer();
    await updateUserComments(photo);
    dispatch(updateUserAvatar(photo));
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../images/photoGround.jpg")}
      >
        <View style={styles.wrapper}>
          <UserAvatar
            avatar={avatar}
            onPick={pickAvatar}
            onRemove={removeAvatar}
          />
          <TouchableOpacity
            style={styles.btnRight}
            activeOpacity={0.7}
            onPress={signOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>{login}</Text>
          {userPosts.length > 0 ? (
            <FlatList
              data={userPosts}
              style={styles.postList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PostItem item={item} navigation={navigation} userId={userId} />
              )}
            />
          ) : (
            <Text style={styles.placeholderText}>
              There will be posts here.
            </Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },

  wrapper: {
    flex: 1,
    position: "relative",
    width: "100%",
    marginTop: 147,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },

  btnRight: {
    position: "absolute",
    right: 16,
    top: 54,
  },

  title: {
    marginBottom: 32,
    textAlign: "center",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
  },

  postList: {
    marginHorizontal: 16,
    maxWidth: 360,
    marginBottom: 48,
  },

  placeholderText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});

export default ProfileScreen;
