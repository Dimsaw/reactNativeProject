import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        justifyContent: "flex-end",
        alignItems: "center",
        height: 88,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#ffffff",
    },

    btnLeft: {
        position: "absolute",
        left: 16,
        top: 54,
    },

    title: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 11,
        paddingBottom: 11,
        fontSize: 17,
        lineHeight: 22,
        color: "#212121",
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
    },

    btnRight: {
        position: "absolute",
        right: 16,
        top: 54,
    },
});

export default styles;