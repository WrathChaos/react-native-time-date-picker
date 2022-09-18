import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./SelectTime.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils";
import RNBounceable from "@freakycoder/react-native-bounceable";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// @ts-ignore
const TimeScroller = ({ title, data, onChange }) => {
  const { options = defaultOptions, utils } = useCalendar();
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollListener = useRef("0");
  const active = useRef(0);
  data = ["", "", ...data, "", ""];
  const flatListRef = useRef();

  useEffect(() => {
    scrollListener.current && clearInterval(Number(scrollListener.current));
    scrollListener.current = scrollAnimatedValue.addListener(
      ({ value }) => (active.current = value),
    );

    return () => {
      clearInterval(Number(scrollListener.current));
    };
  }, [scrollAnimatedValue]);

  // @ts-ignore
  const changeItemWidth = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    !itemSize && setItemSize(width / 5);
  };

  // @ts-ignore
  const renderItem = ({ item, index }) => {
    const makeAnimated = (a: number, b: number, c: number) => {
      return {
        inputRange: [...data.map((_: any, i: number) => i * itemSize)],
        outputRange: [
          ...data.map((_: any, i: number) => {
            const center = i + 2;
            if (center === index) {
              return a;
            } else if (center + 1 === index || center - 1 === index) {
              return b;
            } else {
              return c;
            }
          }),
        ],
      };
    };

    return (
      <RNBounceable
        onPress={() => {
          // @ts-ignore
          flatListRef.current.scrollToOffset({
            animated: true,
            offset: item * itemSize,
          });
        }}
      >
        <Animated.View
          style={[
            {
              width: itemSize,
              opacity: scrollAnimatedValue.interpolate(
                makeAnimated(1, 0.6, 0.2),
              ),
              transform: [
                {
                  scale: scrollAnimatedValue.interpolate(
                    makeAnimated(2, 0.9, 0.8),
                  ),
                },
                {
                  scaleX: I18nManager.isRTL ? -1 : 1,
                },
              ],
            },
            style.listItem,
          ]}
        >
          <Text style={style.listItemText}>
            {utils.getConvertedNumber(
              String(item).length === 1 ? "0" + String(item) : String(item),
            )}
          </Text>
        </Animated.View>
      </RNBounceable>
    );
  };

  return (
    <View style={style.row} onLayout={changeItemWidth}>
      <Text style={style.title}>{title}</Text>
      <AnimatedFlatList
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }],
          {
            useNativeDriver: true,
          },
        )}
        data={I18nManager.isRTL ? data.reverse() : data}
        onMomentumScrollEnd={() => {
          const index = Math.round(active.current / itemSize);
          onChange(data[index + 2]);
        }}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        inverted={I18nManager.isRTL}
        contentContainerStyle={
          I18nManager.isRTL && {
            transform: [
              {
                scaleX: -1,
              },
            ],
          }
        }
      />
    </View>
  );
};

const SelectTime = () => {
  const {
    options = defaultOptions,
    state,
    utils,
    minuteInterval = 1,
    mode,
    onTimeChange,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const [show, setShow] = useState(false);
  const [time, setTime] = useState({
    minute: 0,
    hour: 0,
  });
  const style = styles(options);
  const openAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    show &&
      setTime({
        minute: 0,
        hour: 0,
      });
  }, [show]);

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
      activeDate: utils.getFormatted(newTime),
      selectedDate: mainState.selectedDate
        ? utils.getFormatted(
            utils
              .getDate(mainState.selectedDate)
              .hour(time.hour)
              .minute(time.minute),
          )
        : "",
    });
    onTimeChange(utils.getFormatted(newTime, "timeFormat"));
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

  return show ? (
    <Animated.View style={containerStyle}>
      <TimeScroller
        title={utils.config.hour}
        data={Array.from({ length: 24 }, (x, i) => i)}
        onChange={(hour: number) => {
          setTime({ ...time, hour });
        }}
      />
      <TimeScroller
        title={utils.config.minute}
        data={Array.from(
          { length: 60 / minuteInterval },
          (x, i) => i * minuteInterval,
        )}
        onChange={(minute: number) => setTime({ ...time, minute })}
      />
      <View style={style.footer}>
        <RNBounceable style={style.button} onPress={selectTime}>
          <Text style={style.btnText}>{utils.config.timeSelect}</Text>
        </RNBounceable>
        {mode !== Modes.time && (
          <RNBounceable
            style={[style.button, style.cancelButton]}
            onPress={() =>
              setMainState({
                type: "toggleTime",
              })
            }
          >
            <Text style={style.btnText}>{utils.config.timeClose}</Text>
          </RNBounceable>
        )}
      </View>
    </Animated.View>
  ) : null;
};

export { SelectTime };
