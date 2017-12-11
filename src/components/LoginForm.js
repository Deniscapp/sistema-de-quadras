import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Picker, Label, Button, Text, Spinner, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { signIn, emailChanged, passwordChanged, roleChanged } from '../actions/AuthActions';

class LoginForm extends Component {
    constructor(props){
      super(props);
    }

    renderToast(error){
      Toast.show({
            text: error,
            position: 'bottom',
            buttonText: 'Ok',
            duration: 3000
          })
    }

    renderButton() {
      if (this.props.loader) {
        return <Spinner color='#173358' />;
      }
    
    
      return (
        <Button onPress={e => this.props.signIn({ email: this.props.email, password: this.props.password }, this.renderToast)} style={{backgroundColor: '#54D0E0', marginBottom: 10, marginLeft: 20, marginRight: 20 }} block>
          <Text style={{color: 'white'}}> Entrar </Text>
        </Button>
      );
    }

    render () {
      console.log(this.props)
      return (
        <Form>
            <Item style={styles.input}>
              <Icons style={{ color: 'white', fontSize: 25, marginRight: 10 }} name='email' />
              <Input value={this.props.email} onChangeText={email => this.props.emailChanged(email)} style={{ color: 'white' }} placeholderTextColor='white' selectionColor='white' placeholder="Email" />
            </Item>
            <Item style={[styles.input, { marginTop: 20 }]}>
              <Icons style={{ color: 'white', fontSize: 25, marginRight: 10 }} name='lock' />
              <Input value={this.props.password} onChangeText={password => this.props.passwordChanged(password)} style={{ color: 'white' }} placeholderTextColor='white' selectionColor='white' secureTextEntry placeholder="Senha" />
            </Item>
            <Item style={[styles.input, { marginBottom: 30 }]}>
              <Icons style={{ color: 'white', fontSize: 25, marginRight: 10, top: 10 }} name='assignment-ind' />
              <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                  <Picker
                    mode='dropdown'
                    style={{  flex: .95, color: 'white' }}
                    selectedValue={this.props.role}
                    onValueChange={role => this.props.roleChanged(role)}>
                    <Picker.Item label="Aluno" value="Aluno" />
                    <Picker.Item label="Docente" value="Docente" />
                    <Picker.Item label="Org. Acadêmica" value="Org. Acadêmica" />
                  </Picker>
              </View>
            </Item>
            {this.renderButton()}
        </Form>
      )
    }
}

const mapStateToProps = state => {
  const { email, password, error, loader, role } = state.signIn;
  return { email, password, error, loader, role };
}

const styles = StyleSheet.create({
  input: {
    marginLeft: 40,
    marginRight: 40
  },
  loginButton: {
    backgroundColor: '#C42633',
    marginTop: 30,
    alignSelf: 'center'
  },
  recoverPasswordText: {
    fontSize: 14,
    color: '#757679'
  },
  recoverPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 40
  }
})

export default connect(mapStateToProps, { signIn, emailChanged, passwordChanged, roleChanged } )(LoginForm);
