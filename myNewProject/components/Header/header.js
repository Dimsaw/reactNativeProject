import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperation";

const Header = ({ title, back, navigation }) => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    return (
        <View style={styles.header}>
            {back && (
                <TouchableOpacity
                    style={styles.btnLeft}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            {title === "Post" && (
                <TouchableOpacity
                    style={styles.btnRight}
                    activeOpacity={0.7}
                    onPress={signOut}
                >
                    <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
            )}
        </View>
    );
};

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

export default Header;
