import React, { createContext, useContext, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Calendar, SelectMonth, SelectTime } from "./components";
import { IOptions, ITimeDatePickerProps, Modes, utils } from "../utils";

const options = {
  backgroundColor: "#fff",
  textHeaderColor: "#212c35",
  textDefaultColor: "#2d4150",
  selectedTextColor: "#fff",
  mainColor: "#61dafb",
  textSecondaryColor: "#7a92a5",
  borderColor: "rgba(122, 146, 165, 0.1)",
  defaultFont: "System",
  headerFont: "System",
  textFontSize: 15,
  textHeaderFontSize: 17,
  headerAnimationDistance: 100,
  daysAnimationDistance: 200,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action };
    case "toggleMonth":
      return { ...state, monthOpen: !state.monthOpen };
    case "toggleTime":
      return { ...state, timeOpen: !state.timeOpen };
    default:
      throw new Error("Unexpected action");
  }
};

interface IContextValueProps extends ITimeDatePickerProps {
  utils: utils;
  state: any;
}

// @ts-ignore
const CalendarContext = createContext<IContextValueProps>();

const useCalendar = () => {
  return useContext(CalendarContext);
};

const TimeDatePicker: React.FC<ITimeDatePickerProps> = (props) => {
  const {
    style,
    currentDate = new Date(),
    selectedDate,
    mode = Modes.date,
    selectorStartingYear = 0,
    selectorEndingYear = 3000,
    disableDateChange = false,
    minuteInterval = 5,
    onSelectedChange,
    onMonthYearChange,
    onTimeChange,
    onDateChange,
    translation = "en",
    ...rest
  } = props;
  const calendarUtils = new utils(props);

  const contextValue: IContextValueProps = {
    ...rest,
    options: { ...options, ...rest.options },
    utils: calendarUtils,
    state: useReducer(reducer, {
      activeDate: currentDate || calendarUtils.getToday(),
      selectedDate: selectedDate
        ? calendarUtils.getFormatted(calendarUtils.getDate(selectedDate))
        : "",
      monthOpen: mode === Modes.monthYear,
      timeOpen: mode === Modes.time,
    }),
  };

  console.log("ContextValue: ", contextValue);

  const [minHeight, setMinHeight] = useState(300);
  const _style = styles(contextValue.options);

  const renderBody = () => {
    switch (contextValue.mode) {
      default:
      case Modes.date:
        return (
          <>
            <Calendar />
            <SelectMonth />
            <SelectTime />
          </>
        );
      case Modes.calendar:
        return (
          <>
            <Calendar />
            <SelectMonth />
          </>
        );
      case Modes.monthYear:
        return <SelectMonth />;
      case Modes.time:
        return <SelectTime />;
    }
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      <View
        style={[_style.container, { minHeight }, style]}
        onLayout={({ nativeEvent }) =>
          setMinHeight(nativeEvent.layout.width * 0.9 + 55)
        }
      >
        {renderBody()}
      </View>
    </CalendarContext.Provider>
  );
};

const styles = (theme?: IOptions) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme?.backgroundColor || "#fff",
      position: "relative",
      width: "100%",
      overflow: "hidden",
    },
  });

export { TimeDatePicker, CalendarContext, useCalendar };
