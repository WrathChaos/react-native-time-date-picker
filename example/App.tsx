// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import ValuePicker from "react-native-picker-horizontal";
//
// export default function App() {
//   const [selected, setSelected] = useState(0);
//
//   const Items = Array.from(Array(60).keys());
//
//   const renderItem = (item: number) => (
//     <Text
//       style={{
//         width: 50,
//         textAlign: "center",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {item}
//     </Text>
//   );
//
//   const defaultExample = (
//     <ValuePicker
//       style={styles.container}
//       data={Items}
//       mark={null}
//       renderItem={renderItem}
//       itemWidth={50}
//       initialIndex={1}
//       onChange={(index: number) => setSelected(index)}
//     />
//   );
//
//   const customExample1 = (
//     <ValuePicker
//       style={styles.container}
//       data={Items}
//       renderItem={(item: number) => (
//         <Text
//           style={{
//             width: 70,
//             textAlign: "center",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {item}
//         </Text>
//       )}
//       itemWidth={70}
//       onChange={(index: number) => setSelected(index)}
//       mark={null}
//       interpolateScale={(index: number, itemWidth: number) => ({
//         inputRange: [
//           itemWidth * (index - 1),
//           itemWidth * index,
//           itemWidth * (index + 1),
//         ],
//         outputRange: [3.5, 6, 3.5],
//       })}
//       interpolateOpacity={(index: number, itemWidth: number) => ({
//         inputRange: [
//           itemWidth * (index - 1),
//           itemWidth * index,
//           itemWidth * (index + 1),
//         ],
//         outputRange: [0.65, 1, 0.65],
//       })}
//     />
//   );
//
//   const customExample2 = (
//     <ValuePicker
//       style={styles.container}
//       data={Items}
//       renderItem={(item: number) => (
//         <Text
//           style={{
//             width: 40,
//             textAlign: "center",
//             height: 70,
//           }}
//         >
//           {item}
//         </Text>
//       )}
//       itemWidth={40}
//       onChange={(index: number) => setSelected(index)}
//       mark={
//         <Text
//           style={{
//             color: "black",
//             fontWeight: "bold",
//             paddingBottom: 30,
//           }}
//         >
//           ▲
//         </Text>
//       }
//       interpolateScale={(index: number, itemWidth: number) => ({
//         inputRange: [
//           itemWidth * (index - 3),
//           itemWidth * (index - 2),
//           itemWidth * (index - 1),
//           itemWidth * index,
//           itemWidth * (index + 1),
//           itemWidth * (index + 2),
//           itemWidth * (index + 3),
//         ],
//         outputRange: [0.7, 0.7, 1.4, 2, 1.4, 0.7, 0.7],
//       })}
//       interpolateOpacity={(index: number, itemWidth: number) => ({
//         inputRange: [
//           itemWidth * (index - 2),
//           itemWidth * (index - 1),
//           itemWidth * index,
//           itemWidth * (index + 1),
//           itemWidth * (index + 2),
//         ],
//         outputRange: [0.7, 0.9, 1, 0.9, 0.7],
//       })}
//     />
//   );
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.container} />
//       <View style={styles.container}>
//         <Text style={{ fontSize: 50, fontWeight: "bold" }}>{selected}</Text>
//       </View>
//       <View style={styles.br} />
//       {defaultExample}
//       <View style={styles.br} />
//       {customExample1}
//       <View style={styles.br} />
//       {customExample2}
//       <View style={styles.br} />
//       <View style={styles.container} />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   br: {
//     borderBottomColor: "#ebebeb",
//     borderBottomWidth: 1,
//     width: "100%",
//   },
// });

import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Modes, TimeDatePicker } from "./lib";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface AppProps {
  style?: CustomStyleProp;
}

const App: React.FC<AppProps> = ({ style }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TimeDatePicker
        mode={Modes.date}
        onSelectedChange={() => {}}
        onMonthYearChange={() => {}}
        onTimeChange={() => {}}
        selectedDate={1666050309000}
      />
    </View>
  );
};

export default App;
