import moment, { Moment } from "moment";
import { IDay, IConfig, ITranslation, IMinMaxDates, ITimeDatePickerProps } from "./types";
declare class utils {
    minMaxDates: IMinMaxDates;
    config: IConfig;
    translationConfig: ITranslation;
    constructor(props: ITimeDatePickerProps);
    getFormatted: (date: Moment, formatName?: string) => string;
    getFormattedDate: (date: number, format?: string) => string;
    getTime: (time: string) => string;
    getToday: () => string;
    getMonthName: (month: number) => string;
    getConvertedNumber: (value: string) => string;
    getDate: (time?: string | number) => moment.Moment;
    getMonthYearText: (time: string) => string;
    checkMonthDisabled: (time: string) => boolean;
    checkArrowMonthDisabled: (time: string, next: boolean) => boolean;
    checkYearDisabled: (year: number, next: boolean) => boolean;
    checkSelectMonthDisabled: (time: string, month: number) => boolean;
    validYear: (time: string, year: number) => string;
    getMonthDays: (time: string) => IDay[];
    useMonthAnimation: (activeDate: number, distance: number, onEnd?: () => void) => any;
}
export { utils };
