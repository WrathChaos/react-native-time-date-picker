import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { TimeDatePicker } from "./lib/TimeDatePicker/TimeDatePicker";
import { Modes } from "./lib/utils";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface AppProps {
  style?: CustomStyleProp;
}

const App: React.FC<AppProps> = ({ style }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TimeDatePicker
        onMonthYearChange={(month) => {
          console.log("month: ", month);
        }}
        onSelectedChange={(selected) => {
          console.log("selected: ", selected);
        }}
        onTimeChange={(time) => {
          console.log("time: ", time);
        }}
        mode={Modes.date}
      />
    </View>
  );
};

export default App;
