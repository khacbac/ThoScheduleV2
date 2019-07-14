/**
 * @format
 */

import { AppRegistry } from "react-native";
import TestCalendar from "./src/component/HomeScreen";
import { name as appName } from "./app.json";
import AppStore from "./root/AppStore";

AppRegistry.registerComponent(appName, () => AppStore);
