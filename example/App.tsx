import React from "react";
import { View } from "react-native";
import moment from "moment";
import { TimeDatePicker, Modes } from "./lib/index";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const now = moment().format("YYYY/MM/DD HH:mm");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        selectedDate={now}
        mode={Modes.date}
        options={{
          daysStyle: {
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: "#f1f1f1",
          },
          is24Hour: false,
        }}
      />
    </View>
  );
};

export default App;
