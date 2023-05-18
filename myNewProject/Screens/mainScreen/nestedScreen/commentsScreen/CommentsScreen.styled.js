import { StyleSheet } from 'react-native';

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

export default styles;