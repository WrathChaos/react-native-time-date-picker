import { ViewStyle, StyleSheet } from "react-native";
import { IOptions } from "../../../utils/types";

export const styles = (theme: IOptions) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row-reverse",
    },
    reverseContainer: {
      flexDirection: "row",
    },
    arrowWrapper: {
      padding: 20,
      position: "relative",
      zIndex: 1,
      opacity: 1,
    },
    arrow: {
      width: 18,
      height: 18,
      opacity: 0.9,
      tintColor: theme.mainColor,
      margin: 2,
    },
    leftArrow: {
      transform: [
        {
          rotate: "180deg",
        },
      ],
    },
    disableArrow: {
      opacity: 0,
    },
    monthYearContainer: {
      flex: 1,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    monthYear: {
      position: "absolute",
      alignItems: "center",
      flexDirection: "row-reverse",
    },
    reverseMonthYear: {
      flexDirection: "row",
    },
    activeMonthYear: {
      zIndex: 999,
    },
    monthYearWrapper: {
      alignItems: "center",
    },
    headerText: {
      fontSize: theme.textHeaderFontSize,
      padding: 2,
      color: theme.textHeaderColor,
      fontFamily: theme.defaultFont,
      fontWeight: "500",
      textAlignVertical: "center",
    },
    monthText: {
      fontFamily: theme.headerFont,
    },
    centerWrapper: {
      borderColor: theme.borderColor,
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignItems: "center",
      borderRadius: 12,
      borderWidth: 1,
    },
    time: {
      marginRight: 5,
    },
  });
