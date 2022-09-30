import React, { createContext, useContext, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";
import { Calendar, SelectMonth, SelectTime } from "./components";
import { utils } from "../utils";
import { IOptions, ITimeDatePickerProps, Modes } from "../utils/types";

export const defaultOptions: IOptions = {
  backgroundColor: "#fff",
  textHeaderColor: "#241523",
  textDefaultColor: "#432d50",
  selectedTextColor: "#fff",
  mainColor: "#aa7ff9",
  textSecondaryColor: "#967aa5",
  borderColor: "rgba(53, 33, 52, 0.1)",
  defaultFont: "System",
  headerFont: "System",
  textFontSize: 15,
  textHeaderFontSize: 17,
  headerAnimationDistance: 100,
  daysAnimationDistance: 200,
  daysStyle: {},
  is24Hour: true,
};

const reducer = (state: any, action: any) => {
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
  } = props;
  const calendarUtils = new utils(props);

  const contextValue: IContextValueProps = {
    ...props,
    options: { ...defaultOptions, ...props.options },
    utils: calendarUtils,
    state: useReducer(reducer, {
      activeDate: currentDate || moment().valueOf(),
      selectedDate: selectedDate,
      monthOpen: mode === Modes.monthYear,
      timeOpen: mode === Modes.time,
    }),
  };

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

export { TimeDatePicker, useCalendar };
