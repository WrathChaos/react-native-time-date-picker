import React, { useState } from "react";
import {
  Animated,
  I18nManager,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./Header.style";
import { useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils";

interface HeaderProps {
  changeMonth: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ changeMonth }) => {
  const {
    options,
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
    options.headerAnimationDistance,
    () => setDisableChange(false),
  );
  const prevDisable =
    disableDateChange ||
    (minimumDate &&
      utils.checkArrowMonthDisabled(mainState.activeDate, true)) ||
    true;
  const nextDisable =
    disableDateChange ||
    (maximumDate &&
      utils.checkArrowMonthDisabled(mainState.activeDate, false)) ||
    false;

  const onChangeMonth = (type: string) => {
    if (disableChange) return;
    setDisableChange(true);
    changeMonthAnimation(type);
    const modificationNumber = type === "NEXT" ? 1 : -1;
    const newDate = utils
      .getDate(mainState.activeDate)
      .add(modificationNumber, "month");
    setMainState({
      type: "set",
      activeDate: utils.getFormatted(newDate),
    });
    changeMonth(type);
  };

  return (
    <View
      style={[style.container, I18nManager.isRTL && style.reverseContainer]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !nextDisable && onChangeMonth("NEXT")}
        style={style.arrowWrapper}
      >
        <Image
          source={require("../../../assets/arrow.png")}
          style={[style.arrow, nextDisable && style.disableArrow]}
        />
      </TouchableOpacity>
      <View style={style.monthYearContainer}>
        <Animated.View
          style={[
            style.monthYear,
            shownAnimation,
            style.activeMonthYear,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[style.centerWrapper, style.monthYearWrapper]}
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
          </TouchableOpacity>
          {mode === Modes.date && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                style.centerWrapper,
                {
                  marginRight: I18nManager.isRTL ? 0 : 5,
                  marginLeft: I18nManager.isRTL ? 5 : 0,
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
            </TouchableOpacity>
          )}
        </Animated.View>
        <Animated.View
          style={[
            style.monthYear,
            hiddenAnimation,
            I18nManager.isRTL && style.reverseMonthYear,
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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !prevDisable && onChangeMonth("PREVIOUS")}
        style={style.arrowWrapper}
      >
        <Image
          source={require("../../../assets/arrow.png")}
          style={[
            style.arrow,
            style.leftArrow,
            prevDisable && style.disableArrow,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export { Header };
