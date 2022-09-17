import en from "./en";
import tr from "./tr";

export interface ITranslation {
  dayNames: string[];
  dayNamesShort: string[];
  monthNames: string[];
  selectedFormat: string;
  dateFormat: string;
  monthYearFormat: string;
  timeFormat: string;
  hour: string;
  minute: string;
  timeSelect: string;
  timeClose: string;
}

export { en, tr };
