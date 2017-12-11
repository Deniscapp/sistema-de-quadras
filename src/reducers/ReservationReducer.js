import { DAY_CHANGED, SPORT_CHANGED, TIME_CHANGED } from '../actions/types';

const INITIAL_STATE = { day: '', month: '', timestamp: '', dateString: '', selected: false, time: '', sport: 'Futebol' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DAY_CHANGED:
      const { day, month, timestamp, dateString } = action.payload;
      return { ...state, day, month, timestamp, dateString, selected: true  };
    case TIME_CHANGED:
      return { ...state, time: action.payload }
      case SPORT_CHANGED:
        return { ...state, sport: action.payload }  
    default:
      return state;
  }
}