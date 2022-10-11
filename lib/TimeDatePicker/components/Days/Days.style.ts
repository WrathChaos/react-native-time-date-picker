import { StyleSheet } from "react-native";
import { IOptions } from "../../../utils/types";

export const styles = (theme: IOptions) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexWrap: "wrap",
      left: 5,
    },
    dayItem: {
      flex: 1,
      margin: 3,
      borderColor: theme.borderColor,
      alignItems: "center",
      justifyContent: "center",
    },
    dayTodayItem: {
      borderWidth: 2,
      borderColor: theme.borderColor,
    },
    dayItemSelected: {
      backgroundColor: theme.mainColor,
    },
    dayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
      textAlign: "center",
      width: "100%",
    },
    dayTextSelected: {
      color: theme.selectedTextColor,
      fontFamily: theme.headerFont,
    },
    dayTextDisabled: {
      opacity: 0.2,
    },
  });
