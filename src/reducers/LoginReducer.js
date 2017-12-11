import { SIGNED_IN, EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, WRONG_CREDENTIALS, MISSING_CREDENTIALS, LOG_OUT, ROLE_CHANGED } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', loader: false, signedIn: false, user: {}, role: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    case LOGIN_USER:
      return { ...state, loader: true }
    case SIGNED_IN:
      return { ...state, error: '', email: '', password: '', loader: false, signedIn: true, user: action.payload };
    case WRONG_CREDENTIALS:
      return { ...state, loader: false };
    case MISSING_CREDENTIALS:
      return { ...state, loader: false };
    case LOG_OUT:
      return { ...state, signedIn: false };
    case ROLE_CHANGED:
    console.log(action.payload)
      return { ...state, role: action.payload, error: ''}
    default:
      return state;
  }
}
