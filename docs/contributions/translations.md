# Translations

We highly encourage you to add new translations. Please follow the steps below:

- Create language file in `lib/utils/translations/` directory. _For example `en.ts`_
- Create a translation object following the same format like in other files
    - _please make sure to change object name per your language_

```ts
export default {
    dayNames: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    dayNamesShort: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    selectedFormat: "YYYY/MM/DD",
    dateFormat: "YYYY/MM/DD",
    monthYearFormat: "YYYY MM",
    timeFormat: "HH:mm",
    hour: "Hour",
    minute: "Minute",
    timeSelect: "Select",
    timeClose: "Close",
};
```

- Import and export your translation file in `lib/utils/translations/index.ts` file.

- Add info about a new language to documentation.
