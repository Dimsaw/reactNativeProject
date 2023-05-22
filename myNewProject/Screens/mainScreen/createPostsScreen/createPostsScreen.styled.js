import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    cameraWrapper: {
        alignSelf: "center",
        position: "relative",
        height: 240,
        width: 360,
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        overflow: "hidden",
    },

    camera: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    photoBtn: {
        position: "absolute",
        width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },

    photo: {
        position: "absolute",
        zIndex: 15,
        height: "100%",
        width: "100%",
    },

    cameraLabel: {
        marginLeft: 16,
        marginBottom: 32,
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Roboto-Regular",
        color: "#bdbdbd",
    },

    form: {
        marginHorizontal: 16,
    },

    titleInput: {
        height: 50,
        marginBottom: 16,
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Roboto-Regular",
        borderBottomWidth: 1,
    },

    locationInput: {
        height: 50,
        paddingLeft: 28,
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Roboto-Regular",
        borderBottomWidth: 1,
    },

    locationIcon: {
        position: "absolute",
        top: 16,
        color: "#bdbdbd",
    },

    btn: {
        height: 51,
        marginTop: 43,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    btnLabel: {
        color: "#f0f8ff",
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Roboto-Regular",
    },

    trashBtn: {
        width: 70,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default styles;
