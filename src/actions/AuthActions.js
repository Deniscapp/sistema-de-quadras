import firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNED_IN,
  WRONG_CREDENTIALS,
  LOGIN_USER,
  MISSING_CREDENTIALS,
  LOG_OUT,
  ROLE_CHANGED
} from "../actions/types";

export const roleChanged = role => {
  return {
    type: ROLE_CHANGED,
    payload: role
  };
}

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = password => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

export const signedIn = user => {
  return dispatch => {
    dispatch({ type: SIGNED_IN, payload: user });
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: LOG_OUT });
  }
}

export const signIn = ({ email, password }, renderToast) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    if (email === '' || password === '') {
      dispatch({ type: MISSING_CREDENTIALS });  
      renderToast("Credenciais incompletas!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: SIGNED_IN, payload: user });
          Actions.main();
        })
        .catch(err => {
          console.log("Error: ", err.code);
          if (err.code === "auth/user-not-found") {
            console.log("Creating new account...");
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async user => {
                const database = firebase.database();
                await database.ref('users/' + user.uid).set({ email: user.email, role: '' });
                dispatch({ type: SIGNED_IN, payload: user });
                Actions.main();
              })
              .catch(err => console.log(err));
          } else {
            dispatch({ type: WRONG_CREDENTIALS });
            renderToast("Credenciais erradas!")
          }
        });
    }
  };
};
