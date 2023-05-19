import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 32,
    },

    img: {
        height: 240,
        width: "100%",
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
    },

    postTitle: {
        marginBottom: 8,
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        textAlign: "left",
    },

    postInfo: {
        display: "flex",
        flexDirection: "row",
    },

    socialsText: {
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        fontFamily: "Roboto-Regular",
    },

    commentWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 24,
    },

    commentIcon: {
        transform: [{ rotate: "-90deg" }],
        marginRight: 8,
    },

    likeWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    likeIcon: {
        marginRight: 6,
    },

    locationWrapper: {
        marginLeft: "auto",
    },

    locationBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    locationIcon: {
        marginRight: 4,
    },

    locationText: {
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
        textDecorationColor: "#212121",
        fontFamily: "Roboto-Regular",
    },
});

export default styles;