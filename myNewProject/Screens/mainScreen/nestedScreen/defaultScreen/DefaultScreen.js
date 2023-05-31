import { View, Text, Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";

import styles from "./defaultScreen.styled";

import PostItem from "../../../../components/postItem/postItem";

import { db } from "../../../../firebase/config";

const DefaultScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const { avatar, login, email, userId } = useSelector((state) => state.auth);
    console.log("login", login);
    console.log("avatar", avatar);

    const getAllPosts = async () => {
        const commentsQuery = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(commentsQuery, (data) => {
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.infoProfile}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
                <View style={styles.athorInfo}>
                    <Text style={styles.name}>{login}</Text>
                    <Text style={styles.email}> {email} </Text>
                </View>
            </View>
            <FlatList
                data={posts}
                style={styles.postList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostItem item={item} navigation={navigation} userId={userId} />
                )}
            />
        </View>
    );
};



export default DefaultScreen;
