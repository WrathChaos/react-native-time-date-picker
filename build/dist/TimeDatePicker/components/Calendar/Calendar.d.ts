import React from "react";
import { StyleProp, ViewStyle } from "react-native";
export interface CalendarProps {
    calendarStyle?: StyleProp<ViewStyle>;
}
declare const Calendar: React.FC<CalendarProps>;
export { Calendar };
