import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  //   sets a timeout so that the alert will dissapear after a set amount of time
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
