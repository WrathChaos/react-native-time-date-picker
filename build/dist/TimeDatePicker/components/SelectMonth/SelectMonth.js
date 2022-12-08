import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, I18nManager, Image, Text, TextInput, View, } from "react-native";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { styles } from "./SelectMonth.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils/types";
const SelectMonth = () => {
    const { options = defaultOptions, state, utils, selectorStartingYear = 0, selectorEndingYear = 3000, mode, minimumDate, maximumDate, onMonthYearChange, } = useCalendar();
    const [mainState, setMainState] = state;
    const [show, setShow] = useState(false);
    const style = styles(options);
    const [year, setYear] = useState(utils.getMonthYearText(mainState.activeDate).split(" ").at(-1) ?? '');
    const openAnimation = useRef(new Animated.Value(0)).current;
    const currentMonth = Number(moment(mainState.activeDate).month() + 1);
    const prevDisable = (maximumDate &&
        utils.checkYearDisabled(Number(utils.getConvertedNumber(year)), true)) ||
        false;
    const nextDisable = (minimumDate &&
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
        show && setYear(utils.getMonthYearText(mainState.activeDate).split(" ").at(-1) ?? '');
    }, [mainState.activeDate, utils, show]);
    const onSelectMonth = (month) => {
        if (show) {
            let y = Number(utils.getConvertedNumber(year));
            const date = utils.getDate(utils.validYear(mainState.activeDate, y));
            const activeDate = month !== null ? date.month(month) : date;
            setMainState({
                type: "set",
                activeDate,
            });
            month !== null && onMonthYearChange(activeDate.valueOf());
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
    const onSelectYear = (val) => {
        let y = Number(utils.getConvertedNumber(year)) + val;
        if (y > selectorEndingYear) {
            y = selectorEndingYear;
        }
        else if (y < selectorStartingYear) {
            y = selectorStartingYear;
        }
        setYear(utils.getConvertedNumber(String(y)));
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
    return show ? (<Animated.View style={containerStyle}>
      <View style={[style.header, I18nManager.isRTL && style.reverseHeader]}>
        <RNBounceable style={style.arrowWrapper} onPress={() => !nextDisable && onSelectYear(-1)}>
          <Image source={require("../../../local-assets/arrow.png")} style={[
            style.arrow,
            style.leftArrow,
            nextDisable && style.disableArrow,
        ]}/>
        </RNBounceable>
        <TextInput style={style.yearInput} keyboardType="numeric" maxLength={4} value={year} onBlur={() => onSelectYear(0)} underlineColorAndroid={"rgba(0,0,0,0)"} returnKeyType="done" autoCorrect={false} blurOnSubmit selectionColor={options.mainColor} onChangeText={onChangeYear}/>
        <RNBounceable style={style.arrowWrapper} onPress={() => !prevDisable && onSelectYear(+1)}>
          <Image source={require("../../../local-assets/arrow.png")} style={[style.arrow, prevDisable && style.disableArrow]}/>
        </RNBounceable>
      </View>

      <View style={[style.monthList, { flexDirection: "row" }]}>
        {[...Array(12).keys()].map((item) => {
            const disabled = utils.checkSelectMonthDisabled(mainState.activeDate, item);
            return (<RNBounceable key={item} style={[
                    style.item,
                    currentMonth === item + 1 && style.selectedItem,
                ]} onPress={() => !disabled && onSelectMonth(item)}>
              <Text style={[
                    style.itemText,
                    currentMonth === item + 1 && style.selectedItemText,
                    disabled && style.disabledItemText,
                ]}>
                {utils.getMonthName(item)}
              </Text>
            </RNBounceable>);
        })}
      </View>
    </Animated.View>) : null;
};
export { SelectMonth };
//# sourceMappingURL=SelectMonth.js.map