import React, { useEffect } from "react";
import { View, Text, Animated, StyleProp, ViewStyle } from "react-native";
import { styles } from "./Calendar.style";
import { Header } from "../Header/Header";
import { Days } from "../Days/Days";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";

export interface CalendarProps {
  calendarStyle?: StyleProp<ViewStyle>;
}

const Calendar: React.FC<CalendarProps> = ({ calendarStyle }) => {
  const {
    options = defaultOptions,
    state,
    utils,
    onSelectedChange,
    onToggleTime,
    onToggleMonth,
  } = useCalendar();
  const [mainState] = state;
  const style = styles(options);
  const [{ shownAnimation }, changeMonthAnimation] = utils.useMonthAnimation(
    mainState.activeDate,
    options.daysAnimationDistance || 200,
  );

  useEffect(() => {
    mainState.selectedDate && onSelectedChange(mainState.selectedDate);
  }, [mainState.selectedDate, onSelectedChange]);

  return (
    <View style={[style.container, calendarStyle]}>
      <Header
        changeMonth={changeMonthAnimation}
        onToggleMonth={onToggleMonth}
        onToggleTime={onToggleTime}
      />
      <View style={[style.daysName, { flexDirection: "row" }]}>
        {utils.config.dayNamesShort.map((item) => (
          <Text key={item} style={style.daysNameText}>
            {item}
          </Text>
        ))}
      </View>
      <View style={style.daysContainer}>
        <Animated.View style={[style.days, shownAnimation]}>
          <Days />
        </Animated.View>
      </View>
    </View>
  );
};

export { Calendar };
