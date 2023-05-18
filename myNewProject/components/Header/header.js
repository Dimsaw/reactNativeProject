import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperation";

import styles from './header.styled'

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


export default Header;
