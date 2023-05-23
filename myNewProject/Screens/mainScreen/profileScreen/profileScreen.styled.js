import { StyleSheet } from "react-native";

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

export default styles;
