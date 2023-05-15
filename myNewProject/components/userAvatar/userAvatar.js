import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const UserAvatar = ({ avatar, onPick, onRemove }) => {
    return (
        <View style={styles.avatarWrapper}>
            {avatar && !avatar.includes("avatar_placeholder") ? (
                <>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    <TouchableOpacity
                        onPress={onRemove}
                        activeOpacity={0.7}
                        style={styles.removeBtn}
                    >
                        <AntDesign name="pluscircleo" size={25} color="#bdbdbd" />
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    onPress={onPick}
                    activeOpacity={0.7}
                    style={styles.pickBtn}
                >
                    <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
            )}
        </View>
    );
};

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

export default UserAvatar;
