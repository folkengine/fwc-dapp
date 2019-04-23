import { generateStore, EventActions } from 'drizzle';
import drizzleOptions from '../drizzleOptions';
import { toast } from 'react-toastify/index';
import {EventFilter} from "./EventFilter";

function getWagerId(event) {
  return event.returnValues.actionId;
}

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    console.log(action);
    let display = `Wager #${getWagerId(action.event)} made`;
    if (action.event.event === EventFilter.WagerAccepted) {
      display = `Wager #${getWagerId(action.event)} Accepted`;
    } else if (action.event.event === EventFilter.Shame) {
      const winner = action.event.returnValues.winner;
      display = `${winner} Wins Wager #${getWagerId(action.event)}!`;
    }
    console.log(display);
    toast(display);
  }
  return next(action);
};

const appMiddlewares = [ contractEventNotifier ];

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
});
