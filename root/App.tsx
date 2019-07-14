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
import { connect } from "react-redux";
import Screenname from "../src/config/ScreenName";
import HomeScreen from "../src/component/HomeScreen";
import DetailScreen from "../src/component/DetailScreen";
import colors from "../src/res/colors";
import ReducerName from "../src/redux/config/ReducerName";
import SalaryScreen from "../src/component/SalaryScreen";

const AppNavigator = createStackNavigator({
  [Screenname.HomeScreen]: HomeScreen,
  [Screenname.DetailScreen]: DetailScreen,
  [Screenname.SalaryScreen]: SalaryScreen,
});

const AppContainer = createAppContainer(AppNavigator);

interface Props {
  showFloatButton: boolean;
}

interface State {}

class App extends React.Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <AppContainer />
        {/* Rest of the app comes ABOVE the action button component !*/}
        {/* {this.props.showFloatButton && (
          <ActionButton buttonColor={colors.colorMain}>
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
        )} */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    showFloatButton: state[ReducerName.AppReducer].showFloatButton
  };
};

export default connect(mapStateToProps)(App);

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
