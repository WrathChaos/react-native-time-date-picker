<img alt="React Native Time Date Picker" src="assets/logo.png" width="1050"/>

[![React Native Time Date Picker](https://img.shields.io/badge/-Extremely%20easy%20to%20create%20a%20React%20Native%20Component%20Library%20with%20both%20Stateful%20and%20Functional%20Component%20Examples-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-time-date-picker)

[![npm version](https://img.shields.io/npm/v/react-native-time-date-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-time-date-picker)
[![npm](https://img.shields.io/npm/dt/react-native-time-date-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-time-date-picker)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
  <img alt="React Native Time Date Picker"
        src="assets/Screenshots/date-picker.gif" />
</p>
<p align="center">
  <img alt="React Native Time Date Picker"
        src="assets/Screenshots/time-picker.gif" />
</p>
<p align="center">
  <img alt="React Native Time Date Picker"
        src="assets/Screenshots/month-picker.gif" />
</p>


# Installation

Add the dependency:

```bash
npm i react-native-time-date-picker
```

## Peer Dependencies

<h5><i>IMPORTANT! You need install them</i></h5>

```json
"moment": ">= 2.29.4",
"@freakycoder/react-native-bounceable": ">= 1.0.3"
```

# Usage

## Import

```jsx
import TimeDatePicker from "react-native-time-date-picker";
```

## Fundamental Usage

```jsx
 <TimeDatePicker
    selectedDate={now}
    onMonthYearChange={(month) => {
        console.log("month: ", month);
    }}
    onSelectedChange={(selected) => {
        console.log("selected: ", selected);
    }}
    onTimeChange={(time) => {
        console.log("time: ", time);
    }}
/>
```

## Customization Example Usage

```jsx
  <TimeDatePicker
    selectedDate={now}
    mode={Modes.time}
    options={{
        daysStyle: {
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: "#f1f1f1",
        },
        is24Hour: false,
    }}
    onMonthYearChange={(month) => {
        console.log("month: ", month);
    }}
    onSelectedChange={(selected) => {
        console.log("selected: ", selected);
    }}
    onTimeChange={(time) => {
        console.log("time: ", time);
    }}
/>
```

## Example Project 😍

You can checkout the example project 🥰

Simply run

- `npm i`
- `react-native run-ios/android`

should work of the example project.

# Configuration - Props

## Fundamentals

| Property    |  Type  |  Default  | Description           |
| ----------- | :----: | :-------: | --------------------- |
| title       | string | undefined | change the title      |
| description | string | undefined | change the descrition |

## Customization (Optionals)

| Property       |   Type    |  Default  | Description                                                            |
| -------------- | :-------: | :-------: | ---------------------------------------------------------------------- |
| enableButton   |  boolean  |   false   | let you enable the button (must use it for button)                     |
| onPress        | function  | undefined | set your own logic for the button functionality when it is pressed     |
| buttonText     |  string   | undefined | change the button's text                                               |
| style          | ViewStyle |  default  | set or override the style object for the main container                |
| buttonStyle    | ViewStyle |  default  | set or override the style object for the button style                  |
| ImageComponent |   Image   |  default  | set your own component instead of default react-native Image component |

## Future Plans

- [x] ~~LICENSE~~
- [ ] Better integration with date timestamp (number) based
- [ ] Write an article about the lib on Medium


## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Time Date Picker is available under the MIT license. See the LICENSE file for more info.
