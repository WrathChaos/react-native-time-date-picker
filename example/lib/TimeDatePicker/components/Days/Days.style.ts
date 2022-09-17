import { StyleSheet } from "react-native";
import { IOptions } from "../../../utils";

export const styles = (theme: IOptions) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexWrap: "wrap",
    },
    dayItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 3,
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
