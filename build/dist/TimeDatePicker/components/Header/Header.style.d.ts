import { IOptions } from "../../../utils/types";
export declare const styles: (theme: IOptions) => {
    container: {
        alignItems: "center";
        flexDirection: "row-reverse";
    };
    reverseContainer: {
        flexDirection: "row";
    };
    arrowWrapper: {
        padding: number;
        position: "relative";
        zIndex: number;
        opacity: number;
    };
    arrow: {
        width: number;
        height: number;
        opacity: number;
        tintColor: string | undefined;
        margin: number;
    };
    leftArrow: {
        transform: {
            rotate: string;
        }[];
    };
    disableArrow: {
        opacity: number;
    };
    monthYearContainer: {
        flex: number;
        position: "relative";
        alignItems: "center";
        justifyContent: "center";
    };
    monthYear: {
        position: "absolute";
        alignItems: "center";
        flexDirection: "row-reverse";
    };
    reverseMonthYear: {
        flexDirection: "row";
    };
    activeMonthYear: {
        zIndex: number;
    };
    monthYearWrapper: {
        alignItems: "center";
    };
    headerText: {
        fontSize: number | undefined;
        padding: number;
        color: string | undefined;
        fontFamily: string | undefined;
        fontWeight: "500";
        textAlignVertical: "center";
    };
    monthText: {
        fontFamily: string | undefined;
    };
    centerWrapper: {
        borderColor: string | undefined;
        paddingVertical: number;
        paddingHorizontal: number;
        alignItems: "center";
        borderRadius: number;
        borderWidth: number;
    };
    time: {
        marginRight: number;
    };
};
