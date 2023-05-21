import { AntDesign } from "@expo/vector-icons";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./userAvatar.styled";

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



export default UserAvatar;
