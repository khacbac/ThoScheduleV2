/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./src/component/HomeScreen";
import DetailScreen from "./src/component/DetailScreen";
import ScreenName from "./src/config/ScreenName";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import ReducerName from "./src/redux/config/ReducerName";
import AppReducer from "./src/redux/reducer/AppReducers";

const AppNavigator = createStackNavigator({
  [ScreenName.HomeScreen]: HomeScreen,
  [ScreenName.DetailScreen]: DetailScreen
});

const AppContainer = createAppContainer(AppNavigator);

const reducers = combineReducers({
  [ReducerName.AppReducer]: AppReducer
});

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
          <AppContainer />
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Bảng lương"
              onPress={() => console.log("notes tapped!")}
            >
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Cài đặt"
              onPress={() => {}}
            >
              <Icon
                name="md-notifications-off"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
