import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  I18nManager,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./SelectMonth.style";
import { useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils";

const SelectMonth = () => {
  const {
    options,
    state,
    utils,
    selectorStartingYear,
    selectorEndingYear,
    mode,
    minimumDate,
    maximumDate,
    onMonthYearChange,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const [show, setShow] = useState(false);
  const style = styles(options);
  const [year, setYear] = useState(
    utils.getMonthYearText(mainState.activeDate).split(" ")[1],
  );
  const openAnimation = useRef(new Animated.Value(0)).current;
  const currentMonth = Number(mainState.activeDate.split("/")[1]);
  const prevDisable =
    (maximumDate &&
      utils.checkYearDisabled(Number(utils.getConvertedNumber(year)), true)) ||
    true;
  const nextDisable =
    (minimumDate &&
      utils.checkYearDisabled(Number(utils.getConvertedNumber(year)), false)) ||
    false;

  useEffect(() => {
    mainState.monthOpen && setShow(true);
    Animated.timing(openAnimation, {
      toValue: mainState.monthOpen ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0.46, 1),
    }).start(() => {
      !mainState.monthOpen && setShow(false);
    });
  }, [mainState.monthOpen, openAnimation]);

  useEffect(() => {
    show && setYear(utils.getMonthYearText(mainState.activeDate).split(" ")[1]);
  }, [mainState.activeDate, utils, show]);

  const onSelectMonth = (month) => {
    if (show) {
      let y = Number(utils.getConvertedNumber(year));
      const date = utils.getDate(utils.validYear(mainState.activeDate, y));
      const activeDate = month !== null ? date.month(month) : date;
      setMainState({
        type: "set",
        activeDate: utils.getFormatted(activeDate),
      });
      month !== null &&
        onMonthYearChange(utils.getFormatted(activeDate, "monthYearFormat"));
      month !== null &&
        mode !== Modes.monthYear &&
        setMainState({
          type: "toggleMonth",
        });
    }
  };

  useEffect(() => {
    onSelectMonth(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevDisable, nextDisable]);

  const onChangeYear = (text) => {
    if (Number(utils.getConvertedNumber(text))) {
      setYear(utils.getConvertedNumber(text));
    }
  };

  const onSelectYear = (number) => {
    let y = Number(utils.getConvertedNumber(year)) + number;
    if (y > selectorEndingYear) {
      y = selectorEndingYear;
    } else if (y < selectorStartingYear) {
      y = selectorStartingYear;
    }
    setYear(utils.getConvertedNumber(y));
  };

  const containerStyle = [
    style.container,
    {
      opacity: openAnimation,
      transform: [
        {
          scale: openAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    },
  ];

  return show ? (
    <Animated.View style={containerStyle}>
      <View style={[style.header, I18nManager.isRTL && style.reverseHeader]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.arrowWrapper}
          onPress={() => !nextDisable && onSelectYear(-1)}
        >
          <Image
            source={require("../../../assets/arrow.png")}
            style={[
              style.arrow,
              style.leftArrow,
              nextDisable && style.disableArrow,
            ]}
          />
        </TouchableOpacity>
        <TextInput
          style={style.yearInput}
          keyboardType="numeric"
          maxLength={4}
          value={year}
          onBlur={() => onSelectYear(0)}
          underlineColorAndroid={"rgba(0,0,0,0)"}
          returnKeyType="done"
          autoCorrect={false}
          blurOnSubmit
          selectionColor={options.mainColor}
          onChangeText={onChangeYear}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.arrowWrapper}
          onPress={() => !prevDisable && onSelectYear(+1)}
        >
          <Image
            source={require("../../../assets/arrow.png")}
            style={[style.arrow, prevDisable && style.disableArrow]}
          />
        </TouchableOpacity>
      </View>

      <View style={style.monthList}>
        {[...Array(12).keys()].map((item) => {
          const disabled = utils.checkSelectMonthDisabled(
            mainState.activeDate,
            item,
          );
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              style={[
                style.item,
                currentMonth === item + 1 && style.selectedItem,
              ]}
              onPress={() => !disabled && onSelectMonth(item)}
            >
              <Text
                style={[
                  style.itemText,
                  currentMonth === item + 1 && style.selectedItemText,
                  disabled && style.disabledItemText,
                ]}
              >
                {utils.getMonthName(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  ) : null;
};

export { SelectMonth };