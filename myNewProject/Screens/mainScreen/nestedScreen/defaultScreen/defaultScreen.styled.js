import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    infoProfile: {
        flexDirection: "row",
        marginBottom: 25,
        marginHorizontal: 16,
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
        paddingTop: 16,
    },
    postList: {
        marginHorizontal: 16,
        maxWidth: 360,
    },
});

export default styles;