import { IOptions } from "../../../utils/types";
export declare const styles: (theme: IOptions) => {
    container: {
        width: string;
        height: string;
        flexWrap: "wrap";
        left: number;
    };
    dayItem: {
        flex: number;
        margin: number;
        borderColor: string | undefined;
        alignItems: "center";
        justifyContent: "center";
    };
    dayTodayItem: {
        borderWidth: number;
        borderColor: string | undefined;
    };
    dayItemSelected: {
        backgroundColor: string | undefined;
    };
    dayText: {
        fontFamily: string | undefined;
        fontSize: number | undefined;
        color: string | undefined;
        textAlign: "center";
        width: string;
    };
    dayTextSelected: {
        color: string | undefined;
        fontFamily: string | undefined;
    };
    dayTextDisabled: {
        opacity: number;
    };
};
