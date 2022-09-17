import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";
/**
 * ? Local Imports
 */
import { styles } from "./Calendar.style";
import { Header, Days } from "..";
import { useCalendar } from "../../TimeDatePicker";

export interface CalendarProps {
  calendarStyle?: StyleProp<ViewStyle>;
}

const Calendar: React.FC<CalendarProps> = ({ calendarStyle }) => {
  const { options, state, utils, onSelectedChange } = useCalendar();
  const [mainState] = state;
  const style = styles([options, calendarStyle]);
  const [{ shownAnimation }, changeMonthAnimation] = utils.useMonthAnimation(
    mainState.activeDate,
    options.daysAnimationDistance,
  );

  useEffect(() => {
    mainState.selectedDate && onSelectedChange(mainState.selectedDate);
  }, [mainState.selectedDate, onSelectedChange]);

  return (
    <View style={style.container}>
      <Header changeMonth={changeMonthAnimation} />
      <View style={[style.daysName, utils.flexDirection]}>
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
