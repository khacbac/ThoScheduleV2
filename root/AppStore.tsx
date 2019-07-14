import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import ReducerName from "../src/redux/config/ReducerName";
import AppReducer from "../src/redux/reducer/AppReducers";
import App from "./App";

const persistConfig = {
  key: "root",
  storage
};

const reducers = combineReducers({
  [ReducerName.AppReducer]: AppReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);
let persistor = persistStore(store);

class AppStore extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default AppStore;
