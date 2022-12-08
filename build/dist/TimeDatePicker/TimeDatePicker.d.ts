import React from "react";
import { utils } from "../utils";
import { IOptions, ITimeDatePickerProps } from "../utils/types";
export declare const defaultOptions: IOptions;
interface IContextValueProps extends ITimeDatePickerProps {
    utils: utils;
    state: any;
}
declare const useCalendar: () => IContextValueProps;
declare const TimeDatePicker: React.FC<ITimeDatePickerProps>;
export { TimeDatePicker, useCalendar };
