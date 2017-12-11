import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoginForm from '../components/LoginForm';
import AppTitle from '../components/AppTitle';
import LinearGradient from 'react-native-linear-gradient';


class LoginScreen extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#2999A7','#1E9FAA','#1D939D', '#1E7D88', '#2E7088', '#2A7D9A', '#2B86A1']}>
        <ScrollView>
          <AppTitle />
          <LoginForm />
        </ScrollView>
      </LinearGradient>

    );
  }

  handleRecoverPasswordButton(e) {
    Actions.recoverPassword();
  }
}

const styles = StyleSheet.create({
  signUpButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  signUpText: {
    color: '#757679'
  }
})

export default LoginScreen;
