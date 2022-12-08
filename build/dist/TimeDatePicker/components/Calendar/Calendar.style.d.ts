import { IOptions } from "../../../utils/types";
export declare const styles: (theme: IOptions) => {
    container: {
        flexDirection: "column";
        flex: number;
    };
    daysName: {
        paddingBottom: number;
        marginBottom: number;
        alignItems: "center";
        justifyContent: "space-around";
        borderBottomColor: string | undefined;
        borderBottomWidth: number;
        marginHorizontal: number;
    };
    daysNameText: {
        fontFamily: string | undefined;
        color: string | undefined;
        fontSize: number | undefined;
    };
    daysContainer: {
        flex: number;
        position: "relative";
        overflow: "hidden";
        margin: number;
        marginTop: number;
        marginBottom: number;
    };
    days: {
        position: "absolute";
        width: string;
        height: string;
        top: number;
        right: number;
    };
};
