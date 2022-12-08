import { StyleSheet } from "react-native";
export const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    daysName: {
        paddingBottom: 10,
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomColor: theme.borderColor,
        borderBottomWidth: 0.5,
        marginHorizontal: 15,
    },
    daysNameText: {
        fontFamily: theme.defaultFont,
        color: theme.textSecondaryColor,
        fontSize: theme.textFontSize,
    },
    daysContainer: {
        flex: 1,
        position: "relative",
        overflow: "hidden",
        margin: 15,
        marginTop: 5,
        marginBottom: 0,
    },
    days: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
    },
});
//# sourceMappingURL=Calendar.style.js.map