import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { DAY_CHANGED, SPORT_CHANGED, TIME_CHANGED } from "../actions/types";
import uuidv4 from "uuid/v4";
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
export const selectedDay = day => {
  return dispatch => {
    dispatch({ type: DAY_CHANGED, payload: day });
  };
};

export const selectedSport = sport => {
  return dispatch => {
    dispatch({ type: SPORT_CHANGED, payload: sport });
  };
};

export const selectedTime = time => {
  return dispatch => {
    dispatch({ type: TIME_CHANGED, payload: time });
  };
};

export const createReservation = ({ sport, time, dateString }) => {
  return async dispatch => {
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    const key = uuidv4();
    console.log("Creating new reservation...");
    try {
      await database
        .ref(`reservations/${user.uid}/${key}`)
        .set({ sport, time, dateString });
    } catch (err) {
      throw new Error(err);
    }

    let status;
    try {
        status = await RNCalendarEvents.authorizationStatus();
        console.log(`it is `,status)
    } catch (err) {
        console.log(err)
    }

    if (status !== 'authorized') {
        try {
            status = await RNCalendarEvents.authorizeEventStore();
        } catch (err) {
            console.log(err)
        }
    }

    let eventId;
    if (status === 'authorized') {
        try {
            const times = time.split(' - ');
            let startDate = moment(`${dateString}T${times[0]}`)
            let endDate = moment(`${dateString}T${times[1]}`)
            eventId = await RNCalendarEvents.saveEvent(`Jogo de ${sport}`, {
                startDate,
                endDate,
                notes: `Jogo de ${sport} - Criado pelo aplicativo "Sistema de Quadras" `
            });
            console.log(eventId);
        } catch (err) {
            console.log(err)
        }
    }

    Actions.confirmation();

  };
};
