import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import moment, { Moment } from "moment";
import * as translations from "./translations";
import { FORMATTED_DATE, NEXT, SELECTED_FORMAT } from "./defaults.constants";
import {
  IDay,
  IConfig,
  ITranslation,
  IMinMaxDates,
  ITimeDatePickerProps,
  Modes,
} from "./types";

const m = moment();

class utils {
  minMaxDates: IMinMaxDates;
  config: IConfig;
  translationConfig: ITranslation;

  constructor(props: ITimeDatePickerProps) {
    const {
      minimumDate,
      maximumDate,
      mode,
      configs,
      translation = "en",
    } = props;
    this.minMaxDates = {
      minimumDate,
      maximumDate,
    };
    // @ts-ignore
    this.translationConfig = translations[translation];
    this.config = { ...this.translationConfig, ...configs };
    if (mode === Modes.time || mode === Modes.date) {
      this.config.selectedFormat =
        this.config.dateFormat + " " + this.config.timeFormat;
    }
  }

  getFormatted = (date: Moment, formatName = SELECTED_FORMAT): string => {
    // @ts-ignore
    return date.format(this.config[formatName]);
  };

  getFormattedDate = (date: number, format = FORMATTED_DATE) =>
    moment(date).format(format);

  getTime = (time: string) => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormatted(m, "dateFormat");

  getMonthName = (month: number) => this.config.monthNames[month];

  getConvertedNumber = (value: string) => {
    if (value) {
      const charCodeZero = "۰".charCodeAt(0);
      return value.replace(/[۰-۹]/g, (w) =>
        String(w.charCodeAt(0) - charCodeZero),
      );
    }
    return "";
  };

  getDate = (time?: string | number) =>
    moment(time, this.config.selectedFormat);

  getMonthYearText = (time: string) => {
    const date = this.getDate(time);
    const year = this.getConvertedNumber(date.year().toString());
    const month = this.getMonthName(date.month());
    return `${month} ${year}`;
  };

  checkMonthDisabled = (time: string) => {
    const { minimumDate, maximumDate } = this.minMaxDates;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = date.date(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = date.date(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time: string, next: boolean) => {
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormatted(date.add(next ? -1 : 1, "month")),
    );
  };

  checkYearDisabled = (year: number, next: boolean) => {
    const { minimumDate, maximumDate } = this.minMaxDates;
    const y = this.getDate(next ? maximumDate : minimumDate).year();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time: string, month: number) => {
    const date = this.getDate(time);
    const dateWithNewMonth = date.month(month);
    return this.checkMonthDisabled(this.getFormatted(dateWithNewMonth));
  };

  validYear = (time: string, year: number) => {
    const { minimumDate, maximumDate } = this.minMaxDates;
    const date = this.getDate(time).year(year);
    let validDate = this.getFormatted(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = (time: string): IDay[] => {
    const { minimumDate, maximumDate } = this.minMaxDates;
    let date = this.getDate(time);
    const currentMonthDays = date.daysInMonth();
    const firstDay = date.date(1);
    const dayOfMonth = firstDay.day() % 7;
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = date.date(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.getConvertedNumber(String(n + 1)),
          day: n + 1,
          date: date.date(n + 1).valueOf(),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (
    activeDate: number,
    distance: number,
    onEnd?: () => void,
  ): any => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState<string | null>(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = (type: string) => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === NEXT ? -distance : distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === NEXT ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [
      { lastDate, shownAnimation, hiddenAnimation },
      changeMonthAnimation,
    ];
  };
}

export { utils };
