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
        onMonthYearChange={() => {}}
        onSelectedChange={() => {}}
        onTimeChange={() => {}}
        mode={Modes.date}
        options={null}
        selectorEndingYear={() => {}}
        selectorStartingYear={() => {}}
      />
    </View>
  );
};

export default App;
