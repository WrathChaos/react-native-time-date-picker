import { IOptions } from "../../../utils/types";
export declare const styles: (theme: IOptions) => {
    container: {
        position: "absolute";
        width: string;
        height: string;
        top: number;
        right: number;
        backgroundColor: string | undefined;
        borderRadius: number;
        flexDirection: "column";
        zIndex: number;
        justifyContent: "center";
        alignItems: "center";
    };
    header: {
        alignItems: "center";
        paddingHorizontal: number;
        justifyContent: "space-between";
        width: string;
        flexDirection: "row";
    };
    reverseHeader: {
        flexDirection: "row-reverse";
    };
    monthList: {
        flexWrap: "wrap";
        margin: number;
    };
    item: {
        width: string;
        marginHorizontal: string;
        paddingVertical: number;
        marginVertical: number;
        alignItems: "center";
    };
    selectedItem: {
        backgroundColor: string | undefined;
        borderRadius: number;
    };
    itemText: {
        fontFamily: string | undefined;
        fontSize: number | undefined;
        color: string | undefined;
    };
    selectedItemText: {
        color: string | undefined;
    };
    disabledItemText: {
        opacity: number;
    };
    arrowWrapper: {
        padding: number;
        position: "relative";
        zIndex: number;
        opacity: number;
    };
    disableArrow: {
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
    arrowDisable: {
        opacity: number;
    };
    yearInput: {
        fontSize: number | undefined;
        paddingVertical: number;
        paddingHorizontal: number;
        color: string | undefined;
        fontFamily: string | undefined;
        textAlignVertical: "center";
        minWidth: number;
        textAlign: "center";
    };
};
