import React, { useEffect, useRef, useState } from "react";
import { Text, View, Easing, FlatList, Animated, I18nManager, } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { styles } from "./SelectTime.style";
import { defaultOptions, useCalendar } from "../../TimeDatePicker";
import { Modes } from "../../../utils/types";
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
        scrollListener.current = scrollAnimatedValue.addListener(({ value }) => (active.current = value));
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
        const makeAnimated = (a, b, c) => {
            return {
                inputRange: [...data.map((_, i) => i * itemSize)],
                outputRange: [
                    ...data.map((_, i) => {
                        const center = i + 2;
                        if (center === index) {
                            return a;
                        }
                        else if (center + 1 === index || center - 1 === index) {
                            return b;
                        }
                        else {
                            return c;
                        }
                    }),
                ],
            };
        };
        return (<RNBounceable onPress={() => {
                if (title === utils.config.hour) {
                    // @ts-ignore
                    flatListRef.current.scrollToOffset({
                        animated: true,
                        offset: (item - (options.is24Hour ? 0 : 1)) * itemSize,
                    });
                }
                else {
                    // @ts-ignore
                    flatListRef.current.scrollToOffset({
                        animated: true,
                        offset: item * itemSize,
                    });
                }
            }}>
        <Animated.View style={[
                {
                    width: itemSize,
                    opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.2)),
                    transform: [
                        {
                            scale: scrollAnimatedValue.interpolate(makeAnimated(1.8, 0.9, 0.8)),
                        },
                        {
                            scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                    ],
                },
                style.listItem,
            ]}>
          <Text style={style.listItemText}>
            {utils.getConvertedNumber(String(item).length === 1 ? "0" + String(item) : String(item))}
          </Text>
        </Animated.View>
      </RNBounceable>);
    };
    return (<View style={style.row} onLayout={changeItemWidth}>
      <Text style={style.title}>{title}</Text>
      <AnimatedFlatList ref={flatListRef} pagingEnabled showsHorizontalScrollIndicator={false} horizontal snapToInterval={itemSize} decelerationRate={"fast"} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }], {
            useNativeDriver: true,
        })} data={I18nManager.isRTL ? data.reverse() : data} onMomentumScrollEnd={() => {
            const index = Math.round(active.current / itemSize);
            onChange(data[index + 2]);
        }} keyExtractor={(_, i) => String(i)} renderItem={renderItem} inverted={I18nManager.isRTL} contentContainerStyle={I18nManager.isRTL && {
            transform: [
                {
                    scaleX: -1,
                },
            ],
        }}/>
    </View>);
};
const SelectTime = () => {
    const { options = defaultOptions, state, utils, minuteInterval = 1, mode, disableTimeCloseButton = false, onTimeChange, onTimeCancelPress, } = useCalendar();
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
    return show ? (<Animated.View style={containerStyle}>
      <TimeScroller title={utils.config.hour} data={Array.from({ length: options.is24Hour ? 24 : 12 }, (x, i) => i + (options.is24Hour ? 0 : 1))} onChange={(hour) => {
            setTime({ ...time, hour });
        }}/>
      <TimeScroller title={utils.config.minute} data={Array.from({ length: 60 / minuteInterval }, (x, i) => i * minuteInterval)} onChange={(_minute) => setTime({ ...time, minute: _minute })}/>
      <View style={style.footer}>
        <RNBounceable style={style.button} onPress={selectTime}>
          <Text style={style.btnText}>{utils.config.timeSelect}</Text>
        </RNBounceable>
        {!disableTimeCloseButton && mode !== Modes.time && (<RNBounceable style={[style.button, style.cancelButton]} onPress={() => {
                setMainState({
                    type: "toggleTime",
                });
                onTimeCancelPress?.();
            }}>
            <Text style={style.btnText}>{utils.config.timeClose}</Text>
          </RNBounceable>)}
      </View>
    </Animated.View>) : null;
};
export { SelectTime };
//# sourceMappingURL=SelectTime.js.map