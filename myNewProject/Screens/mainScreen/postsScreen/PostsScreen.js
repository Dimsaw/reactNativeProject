import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require("../../../images/avatar.jpeg")}
      />
      <View style={styles.athorInfo}>
        <Text style={styles.name}>Natalia Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
   
    
   
  },
  athorInfo: {
    flex: 1,
    marginLeft: 8,
    marginTop: 50,
   

   
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginTop: 32,
  },
  name: {
    color: "#212121",
  },
  email: {
    color: "#212121",
    opacity: 0.8,
  },
});

export default HomeScreen;






// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const PostsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>PostsScreen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "red",
//   },
// });

// export default PostsScreen;
