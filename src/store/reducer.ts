import type { Advert } from "../pages/advert/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: Advert[];
};

const defaultState: State = {
  auth: false,
  adverts: [],
};

/*
export function reducer(state = defaultState, action: Actions): State {
  switch (action.type) {
    case "auth/login":
      return { ...state, auth: true };
    case "auth/logout":
      return { ...state, auth: false };
    case "adverts/loaded":
      return { ...state, adverts: action.payload };
    case "adverts/created":
      return { ...state, adverts: [...state.adverts, action.payload] };
    default:
      return state;
  }

  return state;
}
*/

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded":
      return action.payload;
    case "adverts/created":
      return [...state, action.payload];
    default:
      return state;
  }
}

/*
export function reducer(state = defaultState, action: Actions): State {
  return {
    auth: auth(state.auth, action),
    adverts: adverts(state.adverts, action),
  };
}


export const reducer = combineReducers({
  auth,
  adverts,
});
*/
