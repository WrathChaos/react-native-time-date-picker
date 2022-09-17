import React from "react";
import { View } from "react-native";
import { TimeDatePicker } from "./lib/TimeDatePicker/TimeDatePicker";
import { Modes } from "./lib/utils";

interface AppProps {}

const App: React.FC<AppProps> = () => {
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
