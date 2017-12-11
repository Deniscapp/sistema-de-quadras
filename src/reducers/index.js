import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ReservationReducer from './ReservationReducer';
import MyReservationsReducer from './MyReservationsReducer';

export default combineReducers({
  signIn: LoginReducer,
  reservation: ReservationReducer,
  myReservations: MyReservationsReducer
});
