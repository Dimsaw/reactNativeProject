import { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    FlatList,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

import { formatPostDate } from "../../../../utils/formatPostDate";
import { db } from "../../../../firebase/config";
import styles from "./CommentsScreen.styled";

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [focused, setFocused] = useState(false);
    const { login, avatar, userId } = useSelector((state) => state.auth);
    const { postId, photo } = route.params;
    const [isFocusedComment, setIsFocusedComment] = useState(false);

    useEffect(() => {
        getAllComments();
    }, []);

    const createComment = async () => {
        console.log("start");
        const date = formatPostDate(new Date());
        console.log("midlle");

        await addDoc(collection(db, `posts/${postId}/comments`), {
            comment,
            login,
            date,
            avatar,
            userId,
        });
        console.log("finish");
        setComment("");
        setIsFocusedComment(false);
        keyboardHide();
    };

    const getAllComments = async () => {
        const commentsQuery = query(
            collection(db, `posts/${postId}/comments`),
            orderBy("date")
        );
        onSnapshot(commentsQuery, (data) =>
            setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    };

    const keyboardHide = () => {
        setFocused(false);
        Keyboard.dismiss();
    };

    return (
        <View
            style={{ ...styles.container, paddingBottom: isFocusedComment ? 250 : 0 }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" && "padding"}
            >
                <View style={styles.photoWrapper}>
                    <Image source={{ uri: photo }} style={styles.photo} />
                </View>

                <FlatList
                    style={styles.messageList}
                    data={allComments}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                ...styles.messageContainer,
                                flexDirection: item.userId === userId ? "row-reverse" : "row",
                            }}
                        >
                            <Image
                                style={{
                                    ...styles.messageAvatar,
                                    marginLeft: item.userId === userId ? 16 : 0,
                                    marginRight: item.userId !== userId ? 16 : 0,
                                }}
                                source={{ uri: item.avatar }}
                            />
                            <View style={styles.message}>
                                <Text style={styles.messageText}>{item.comment}</Text>
                                <Text style={styles.messageDate}>{item.date}</Text>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.form}>
                    <TextInput
                        style={{
                            ...styles.input,
                            borderColor: focused ? "#FF6C00" : "#E8E8E8",
                            backgroundColor: focused ? "#FFFFFF" : "#F6F6F6",
                        }}
                        onFocus={() => {
                            setFocused(true);
                            setIsFocusedComment(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                            setIsFocusedComment(false);
                        }}
                        onSubmitEditing={() => {
                            setFocused(false);
                            setIsFocusedComment(false);
                        }}
                        placeholder="commentate"
                        placeholderTextColor="#BDBDBD"
                        onChangeText={(value) => setComment(value)}
                        value={comment}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.9}
                        onPress={createComment}
                    >
                        <AntDesign name="arrowup" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};



export default CommentsScreen;
