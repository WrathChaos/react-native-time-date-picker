import { ViewStyle, StyleSheet } from "react-native";
import { IOptions } from "../../../utils/types";

export const styles = (theme: IOptions) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      flexDirection: "column",
      zIndex: 999,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      alignItems: "center",
      paddingHorizontal: 15,
      justifyContent: "space-between",
      width: "80%",
      flexDirection: "row",
    },
    reverseHeader: {
      flexDirection: "row-reverse",
    },
    monthList: {
      flexWrap: "wrap",
      margin: 25,
    },
    item: {
      width: "30%",
      marginHorizontal: "1.5%",
      paddingVertical: 8,
      marginVertical: 7,
      alignItems: "center",
    },
    selectedItem: {
      backgroundColor: theme.mainColor,
      borderRadius: 12,
    },
    itemText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
    },
    selectedItemText: {
      color: theme.selectedTextColor,
    },
    disabledItemText: {
      opacity: 0.2,
    },
    arrowWrapper: {
      padding: 13,
      position: "relative",
      zIndex: 1,
      opacity: 1,
    },
    disableArrow: {
      opacity: 0,
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
    arrowDisable: {
      opacity: 0,
    },
    yearInput: {
      fontSize: theme.textHeaderFontSize,
      paddingVertical: 2,
      paddingHorizontal: 4,
      color: theme.textHeaderColor,
      fontFamily: theme.headerFont,
      textAlignVertical: "center",
      minWidth: 100,
      textAlign: "center",
    },
  });
