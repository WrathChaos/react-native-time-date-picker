import { StyleProp, ViewStyle } from "react-native";

export interface IMinMaxDates {
  minimumDate?: string;
  maximumDate?: string;
}

export interface IConfig extends ITranslation {
  selectedFormat: string;
  dateFormat: string;
  timeFormat: string;
}

export enum Modes {
  time = "time-picker",
  date = "date-picker",
  monthYear = "month-year-picker",
  calendar = "calendar-picker",
}

export interface ITimeDatePickerProps extends IMinMaxDates {
  mode?: Modes;
  translation?: string;
  configs?: IConfig;
  style?: StyleProp<ViewStyle>;
  options?: IOptions;
  currentDate?: string;
  selectedDate?: string;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  disableDateChange?: boolean;
  minuteInterval?: number;
  onSelectedChange: (selectedDay: number[]) => void;
  onMonthYearChange: (monthYear: string) => void;
  onTimeChange: (time: string) => void;
  onDateChange?: (selectedDate: string) => void;
}

export interface IOptions {
  backgroundColor?: string;
  textHeaderColor?: string;
  textDefaultColor?: string;
  selectedTextColor?: string;
  mainColor?: string;
  textSecondaryColor?: string;
  borderColor?: string;
  defaultFont?: string;
  headerFont?: string;
  textFontSize?: number;
  textHeaderFontSize?: number;
  headerAnimationDistance?: number;
  daysAnimationDistance?: number;
  daysStyle?: StyleProp<ViewStyle>;
  is24Hour?: boolean;
}

export interface IDay {
  dayString: string;
  date: string;
  disabled: boolean;
}

export interface ITranslation {
  dayNames: string[];
  dayNamesShort: string[];
  monthNames: string[];
  selectedFormat: string;
  dateFormat: string;
  monthYearFormat: string;
  timeFormat: string;
  hour: string;
  minute: string;
  timeSelect: string;
  timeClose: string;
}
