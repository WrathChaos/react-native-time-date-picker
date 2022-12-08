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
        justifyContent: "center";
        zIndex: number;
    };
    row: {
        flexDirection: "column";
        alignItems: "center";
        marginVertical: number;
    };
    title: {
        fontSize: number | undefined;
        color: string | undefined;
        fontFamily: string | undefined;
        marginBottom: number;
    };
    listItem: {
        height: number;
        alignItems: "center";
        justifyContent: "center";
    };
    listItemText: {
        fontSize: number | undefined;
        color: string | undefined;
        fontFamily: string | undefined;
    };
    footer: {
        flexDirection: "row";
        justifyContent: "center";
        marginTop: number;
    };
    button: {
        paddingVertical: number;
        paddingHorizontal: number;
        borderRadius: number;
        backgroundColor: string | undefined;
        margin: number;
    };
    btnText: {
        fontSize: number | undefined;
        color: string | undefined;
        fontFamily: string | undefined;
    };
    cancelButton: {
        backgroundColor: string | undefined;
    };
};
