import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";

export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type text"
          value={value}
          onChangeText={inputHandler}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30
  },
});



// // import { StatusBar } from "expo-status-bar";
// // import { StyleSheet, Text, View } from "react-native";

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text> I LOVE YULIIA!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// // });





// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   TextInput,
// } from "react-native";

// export default function App() {
//   const [value, setValue] = useState("");
//   const inputHandler = (text) => setValue(text);
//   return (
//       <View style={styles.container}>
//         <TextInput
//           placeholder="Type text"
//           value={value}
//           onChangeText={inputHandler}
//         />
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     paddingBottom: 30
//   },
// });

