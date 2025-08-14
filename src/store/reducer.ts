import type { Advert } from "../pages/advert/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: Advert[] | null;
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  adverts: null,
  ui: {
    pending: false,
    error: null,
  },
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
    case "auth/login/fulfilled":
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
    case "adverts/loaded/fulfilled":
      return action.payload;
    case "adverts/created/fulfilled":
      return [...(state ?? []), action.payload];
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (action.type === "auth/login/pending") {
    return { pending: true, error: null };
  }
  if (action.type === "auth/login/fulfilled") {
    return { pending: false, error: null };
  }
  if (action.type === "auth/login/rejected") {
    return { pending: false, error: action.payload };
  }
  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }
  return state;
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
