import { FETCHING_RESERVATIONS, FETCHED_RESERVATION } from '../actions/types';

const INITIAL_STATE = { reservations: [], loader: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_RESERVATIONS:
        return { ...state, loader: true }
    case FETCHED_RESERVATION:
        return { ...state, loader: false, reservations: action.payload}  
    default:
      return state;
  }
}