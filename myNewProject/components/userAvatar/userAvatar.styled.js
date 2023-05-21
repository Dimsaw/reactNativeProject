import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    avatarWrapper: {
        width: 120,
        height: 120,
        position: "absolute",
        top: -60,
        alignSelf: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    pickBtn: {
        position: "absolute",
        bottom: 14,
        right: -12,
    },

    removeBtn: {
        position: "absolute",
        bottom: 14,
        right: -12,
        backgroundColor: "#ffffff",
        borderRadius: 100,
        transform: [{ rotate: "-45deg" }],
    },

    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
    },
});

export default styles;