/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import TestCalendar from "./TestCalendar";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => TestCalendar);
