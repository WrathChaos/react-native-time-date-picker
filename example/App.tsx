import React from "react";
import { View } from "react-native";
import moment from "moment";
import { TimeDatePicker, Modes } from "./lib";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const now = moment().valueOf();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TimeDatePicker
        selectedDate={now}
        mode={Modes.time}
        onToggleTime={() => {
          console.log("toggle time");
        }}
        onToggleMonth={() => {
          console.log("toggle month");
        }}
        onMonthYearChange={(month: number) => {
          console.log("month: ", month); // 1643366100000
          console.log("month formatted: ", moment(month).format("MM")); // 04
          console.log("month formatted: ", moment(month).format("MMM")); // Apr
          console.log("month formatted: ", moment(month).format("MMMM")); // April
        }}
        onSelectedChange={(selected: number) => {
          console.log("selected Date: ", selected); // 1649846100000
          console.log(
            "selected date formatted: ",
            moment(selected).format("YYYY/MM/DD HH:mm"),
          ); // 2022/04/13 13:35
        }}
        onTimeChange={(time: number) => {
          console.log("time: ", time); // 1643331840000
          console.log("time formatted: ", moment(time).format("HH:mm")); // 04:04
        }}
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
