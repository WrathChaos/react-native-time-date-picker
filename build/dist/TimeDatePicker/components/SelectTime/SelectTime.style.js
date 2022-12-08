import { StyleSheet } from "react-native";
export const styles = (theme) => StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        backgroundColor: theme.backgroundColor,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 999,
    },
    row: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 5,
    },
    title: {
        fontSize: theme.textHeaderFontSize,
        color: theme.mainColor,
        fontFamily: theme.headerFont,
        marginBottom: 12,
    },
    listItem: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    listItemText: {
        fontSize: theme.textHeaderFontSize,
        color: theme.textDefaultColor,
        fontFamily: theme.defaultFont,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        backgroundColor: theme.mainColor,
        margin: 8,
    },
    btnText: {
        fontSize: theme.textFontSize,
        color: theme.selectedTextColor,
        fontFamily: theme.defaultFont,
    },
    cancelButton: {
        backgroundColor: theme.textSecondaryColor,
    },
});
//# sourceMappingURL=SelectTime.style.js.map