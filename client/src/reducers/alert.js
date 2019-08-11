import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      // return payload with the new alert
      return [...state, action.payload];
    case REMOVE_ALERT:
      // will return all alerts except for the one that matches the payload
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
