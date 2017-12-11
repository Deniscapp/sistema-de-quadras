import React, { Component } from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";
import rootReducer from "./src/reducers/index";
import LoginScreen from "./src/screens/LoginScreen";
import Router from "./src/Router";
import { signedIn, logout } from './src/actions/AuthActions';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDHUFXXaa5rZ31TO488ViHkg-PWVVUaLFU",
      authDomain: "sistema-de-quadras.firebaseapp.com",
      databaseURL: "https://sistema-de-quadras.firebaseio.com",
      projectId: "sistema-de-quadras",
      storageBucket: "",
      messagingSenderId: "883114336926"
    });

    // firebase.auth().onAuthStateChanged(user => {
    //   console.log("New auth state", user);
    //   if (user) {
    //     this.props.signedIn(user);
    //   } else {
    //     this.props.logout();
    //   }
    // });

  }
  render() {
    return (
      <Root>
        <View style={{ flex: 1 }}>
          <StatusBar hidden={false} />
          <Provider
            store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}
          >
            <Router />
          </Provider>
        </View>
      </Root>
    );
  }
}
