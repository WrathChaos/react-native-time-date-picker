# Internationalization

### Pre-defined

Due to the limited translation possibilities, we only provide a few pre-defined translations into the following languages:

- `en` - English 🇺🇸
- `tr` - Turkish 🇹🇷

First import lang and use it as `translation` prop.

```tsx
<TimeDatePicker
    translation="tr" // default is "en"
/>
```

### Customised

There is possibility to pass own translation to library with the prop called `translation` like this

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

_If you have written a translation into your language, we strongly encourage you to create a Pull Request and add your language to the package, following the [**contributions section**](/docs/contributions/translations.md)._

