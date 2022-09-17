import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { TimeDatePicker } from "./lib/TimeDatePicker/TimeDatePicker";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface AppProps {
  style?: CustomStyleProp;
}

const App: React.FC<AppProps> = ({ style }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TimeDatePicker
        minuteInterval={60}
        onMonthYearChange={() => {}}
        onSelectedChange={() => {}}
        onTimeChange={() => {}}
        options={null}
        selectorEndingYear={() => {}}
        selectorStartingYear={() => {}}
      />
    </View>
  );
};

export default App;
