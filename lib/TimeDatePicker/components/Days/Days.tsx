import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { styles } from "./Days.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";

const Days = () => {
  const {
    state,
    utils,
    options = defaultOptions,
    onDateChange,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);
  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const days = useMemo(() => utils.getMonthDays(mainState.activeDate));

  const onSelectDay = (date: number | undefined) => {
    setMainState({
      type: "set",
      selectedDate: date,
    });
    onDateChange?.(date);
  };

  // @ts-ignore
  const changeItemHeight = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    !itemSize && setItemSize(width / 7 - 0.5);
  };

  return (
    <View
      style={[style.container, { flexDirection: "row" }]}
      onLayout={changeItemHeight}
    >
      {days.map((day, index) => {
        let isSameDay = false;
        let isToday = false;
        const today = moment().valueOf();
        if (day?.date) {
          isSameDay = moment(mainState.selectedDate).isSame(day.date, "day");
          isToday = moment(today).isSame(day.date, "day");
        }
        return (
          <View
            key={index}
            style={{
              width: itemSize,
              height: itemSize,
            }}
          >
            {day && (
              <RNBounceable
                style={[
                  style.dayItem,
                  {
                    borderRadius: itemSize / 2,
                  },
                  options.daysStyle,
                  isToday && style.dayTodayItem,
                  isSameDay && style.dayItemSelected,
                ]}
                onPress={() => !day.disabled && onSelectDay(day.date)}
              >
                <Text
                  style={[
                    style.dayText,
                    isSameDay && style.dayTextSelected,
                    day.disabled && style.dayTextDisabled,
                  ]}
                >
                  {day.dayString}
                </Text>
              </RNBounceable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export { Days };
