import firebase from 'firebase';
import { FETCHING_RESERVATIONS, FETCHED_RESERVATION } from '../actions/types';
export const fetchMyReservations = () => {
    return dispatch => {
        dispatch({ type: FETCHING_RESERVATIONS });
        const user = firebase.auth().currentUser
        const database = firebase.database();
        const reservations = [];
        
        database.ref(`/reservations/${user.uid}`).once('value').then(snapshot => {
            snapshot.forEach((elem, index, arr) => {
                const { key } = elem;
                const { dateString, sport, time } = elem.val();
                reservations.push({ dateString, sport, time, key });
            })

            dispatch({ type: FETCHED_RESERVATION, payload: reservations })
        })
        
       

    }
}