import {
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        fontFamily: "Roboto-Regular",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },

    menu: {
        backgroundColor: "#FFFFFF",
        borderColor: "green",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },

    input: {
        borderWidth: 1,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        marginHorizontal: 16,
        marginBottom: 16,
        paddingLeft: 16,
    },
    toogleBtnPassword: {
        position: "absolute",
        right: 16,
        top: 80,
        paddingRight: 16,
    },
    toogleTextPassword: {
        color: "#1B4371",
        fontSize: 16,
        fontFamily: "Roboto-Regular",
    },

    text: {
        color: "#212121",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 32,
        marginTop: 32,
        fontFamily: "Roboto-Medium",
    },

    btn: {
        borderWidth: 1,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        borderColor: "#ffffff",
        marginHorizontal: 16,
        marginTop: 27,
        marginBottom: 16,
        paddingLeft: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    boxBtn: {
        paddingBottom: 145,
    },
    link: {
        color: "#1B4371",
        textAlign: "center",
        fontSize: 16,
    },
});

export default styles;