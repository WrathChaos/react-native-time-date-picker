import React, { useEffect, useRef, useState } from "react";
import { Text, View, Easing, Animated } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { styles } from "./SelectTime.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils/types";
import HorizontalPicker from "react-native-horizontal-picker-2";

const SelectTime = () => {
  const {
    options = defaultOptions,
    state,
    utils,
    minuteInterval = 1,
    mode,
    disableTimeCloseButton = false,
    onTimeChange,
    onTimeCancelPress,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const minute = options.is24Hour ? 0 : 1;
  const [show, setShow] = useState(false);
  const [time, setTime] = useState({
    minute: minute,
    hour: 0,
  });
  const style = styles(options);
  const openAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    show &&
      setTime({
        minute: minute,
        hour: 0,
      });
  }, [show, minute]);

  useEffect(() => {
    mainState.timeOpen && setShow(true);
    Animated.timing(openAnimation, {
      toValue: mainState.timeOpen ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0.46, 1),
    }).start(() => {
      !mainState.timeOpen && setShow(false);
    });
  }, [mainState.timeOpen, openAnimation]);

  const selectTime = () => {
    const newTime = utils.getDate(mainState.activeDate);
    newTime.hour(time.hour).minute(time.minute);
    setMainState({
      type: "set",
      activeDate: newTime,
      selectedDate: mainState.selectedDate,
    });
    onTimeChange(newTime.valueOf());
    mode !== Modes.time &&
      setMainState({
        type: "toggleTime",
      });
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

  const renderItem = (item: number) => (
    <Text
      style={{
        width: 50,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item}
    </Text>
  );

  return show ? (
    <Animated.View style={containerStyle}>
      <View style={{ flex: 1, maxHeight: 150 }}>
        <Text style={style.title}>{utils.config.hour}</Text>
        <HorizontalPicker
          style={{ height: 100 }}
          data={Array.from({ length: options.is24Hour ? 24 : 12 }, (x, i) => {
            const val = i + (options.is24Hour ? 0 : 1);
            return String(val).length === 1 ? "0" + String(val) : String(val);
          })}
          mark={null}
          renderItem={renderItem}
          itemWidth={50}
          initialIndex={0}
          onChange={(index: number) => {
            setTime({ ...time, hour: index + 1 });
          }}
        />
      </View>
      <View style={{ flex: 1, maxHeight: 150 }}>
        <Text style={style.title}>{utils.config.minute}</Text>
        <HorizontalPicker
          style={{ height: 100 }}
          data={Array.from({ length: 60 / minuteInterval }, (x, i) => {
            const val = i * minuteInterval;
            return String(val).length === 1 ? "0" + String(val) : String(val);
          })}
          mark={null}
          renderItem={renderItem}
          itemWidth={50}
          initialIndex={0}
          onChange={(index: number) => {
            setTime({ ...time, minute: index + 1 });
          }}
        />
      </View>

      <View style={style.footer}>
        <RNBounceable style={style.button} onPress={selectTime}>
          <Text style={style.btnText}>{utils.config.timeSelect}</Text>
        </RNBounceable>
        {!disableTimeCloseButton && mode !== Modes.time && (
          <RNBounceable
            style={[style.button, style.cancelButton]}
            onPress={() => {
              setMainState({
                type: "toggleTime",
              });
              onTimeCancelPress?.();
            }}
          >
            <Text style={style.btnText}>{utils.config.timeClose}</Text>
          </RNBounceable>
        )}
      </View>
    </Animated.View>
  ) : null;
};

export { SelectTime };
