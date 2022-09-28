import React, { useState } from "react";
import { Animated, I18nManager, Image, Text, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { styles } from "./Header.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils/types";

interface HeaderProps {
  changeMonth: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ changeMonth }) => {
  const {
    options = defaultOptions,
    disableDateChange = false,
    state,
    utils,
    minimumDate,
    maximumDate,
    mode,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const style = styles(options);
  const [disableChange, setDisableChange] = useState(false);
  const [
    { lastDate, shownAnimation, hiddenAnimation },
    changeMonthAnimation,
  ] = utils.useMonthAnimation(
    mainState.activeDate,
    options.headerAnimationDistance || 100,
    () => setDisableChange(false),
  );
  const prevDisable =
    disableDateChange ||
    (minimumDate &&
      utils.checkArrowMonthDisabled(mainState.activeDate, true)) ||
    false;
  const nextDisable =
    disableDateChange ||
    (maximumDate &&
      utils.checkArrowMonthDisabled(mainState.activeDate, false)) ||
    false;

  const onChangeMonth = (type: string) => {
    if (disableChange) {
      return;
    }
    setDisableChange(true);
    changeMonthAnimation(type);
    const modificationNumber = type === "NEXT" ? 1 : -1;
    const newDate = utils
      .getDate(mainState.activeDate)
      .add(modificationNumber, "month");
    setMainState({
      type: "set",
      activeDate: newDate,
    });
    changeMonth(type);
  };

  return (
    <View
      style={[style.container, I18nManager.isRTL && style.reverseContainer]}
    >
      <RNBounceable
        style={style.arrowWrapper}
        onPress={() => !nextDisable && onChangeMonth("NEXT")}
      >
        <Image
          source={require("../../../local-assets/arrow.png")}
          style={[style.arrow, nextDisable && style.disableArrow]}
        />
      </RNBounceable>
      <View style={style.monthYearContainer}>
        <Animated.View
          style={[
            style.monthYear,
            shownAnimation,
            style.activeMonthYear,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}
        >
          {mode === Modes.date && (
            <RNBounceable
              style={[
                style.centerWrapper,
                {
                  marginRight: I18nManager.isRTL ? 8 : 0,
                  marginLeft: I18nManager.isRTL ? 0 : 8,
                },
              ]}
              onPress={() =>
                setMainState({
                  type: "toggleTime",
                })
              }
            >
              <Text style={style.headerText}>
                {utils.getConvertedNumber(utils.getTime(mainState.activeDate))}
              </Text>
            </RNBounceable>
          )}
          <RNBounceable
            style={[
              style.centerWrapper,
              style.monthYearWrapper,
              { flexDirection: "row" },
            ]}
            onPress={() =>
              !disableDateChange &&
              setMainState({
                type: "toggleMonth",
              })
            }
          >
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split(" ")[0]}
            </Text>
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split(" ")[1]}
            </Text>
          </RNBounceable>
        </Animated.View>
        <Animated.View
          style={[
            style.monthYear,
            hiddenAnimation,
            I18nManager.isRTL && style.reverseMonthYear,
            { flexDirection: "row" },
          ]}
        >
          <Text style={style.headerText}>
            {utils.getMonthYearText(lastDate).split(" ")[0]}
          </Text>
          <Text style={style.headerText}>
            {utils.getMonthYearText(lastDate).split(" ")[1]}
          </Text>
          {mode === Modes.date && (
            <Text style={style.headerText}>
              {utils.getConvertedNumber(utils.getTime(mainState.activeDate))}
            </Text>
          )}
        </Animated.View>
      </View>
      <RNBounceable
        style={style.arrowWrapper}
        onPress={() => !prevDisable && onChangeMonth("PREVIOUS")}
      >
        <Image
          source={require("../../../local-assets/arrow.png")}
          style={[
            style.arrow,
            style.leftArrow,
            prevDisable && style.disableArrow,
          ]}
        />
      </RNBounceable>
    </View>
  );
};

export { Header };
