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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    photoWrapper: {
        backgroundColor: "#ffffff",
        height: 240,
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        overflow: "hidden",
    },

    photo: {
        width: "100%",
        height: "100%",
    },

    messageList: {
        // flex: 1,
        marginHorizontal: 16,
    },

    messageContainer: {
        width: "100%",
        display: "flex",
    },

    messageAvatar: {
        width: 28,
        height: 28,
        borderRadius: 100,
    },

    message: {
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: 6,
        padding: 16,
        marginBottom: 24,
        flex: 1,
    },

    messageText: {
        color: "#212121",
        fontSize: 13,
        lineHeight: 18,
    },

    messageDate: {
        color: "#bdbdbd",
        fontSize: 10,
        lineHeight: 12,
        textAlign: "right",
    },

    form: {
        position: "relative",
        height: 50,
        borderRadius: 100,
        marginTop: 32,
        marginHorizontal: 16,
        marginBottom: 16,
    },

    input: {
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 100,
        color: "#212121",
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Roboto-Regular",
    },

    btn: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#ff6c00",
    },
});

export default CommentsScreen;
