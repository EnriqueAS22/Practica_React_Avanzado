import type { Advert, Tag, Filters } from "../pages/advert/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: {
    loaded: boolean;
    data: Advert[];
  };
  ui: {
    pending: boolean;
    error: Error | null;
  };
  tags: {
    loaded: boolean;
    data: string[];
    error: Error | null;
  };
  filters: Filters;
};

const defaultState: State = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
  tags: {
    loaded: false,
    data: [],
    error: null,
  },
  filters: {
    name: "",
    priceRange: [0, 25000],
    sale: "all",
    selectedTags: [] as Tag[],
  },
};

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
      return { loaded: false, data: action.payload };
    case "adverts/detail/fulfilled":
      return { loaded: false, data: [action.payload] };
    case "adverts/created/fulfilled":
      return { ...state, data: [action.payload, ...(state.data ?? [])] };
    case "adverts/delete":
      return {
        ...state,
        data: state.data.filter((advert) => advert.id !== action.payload),
      };
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
  if (action.type === "adverts/created/rejected") {
    return { pending: false, error: action.payload };
  }
  if (action.type === "adverts/detail/rejected") {
    return { pending: false, error: action.payload };
  }
  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }
  return state;
}

export function tags(
  state = defaultState.tags,
  action: Actions,
): State["tags"] {
  switch (action.type) {
    case "tags/pending":
      return { ...state, loaded: false, error: null };
    case "tags/fulfilled":
      return { ...state, loaded: true, data: action.payload };
    case "tags/rejected":
      return { ...state, loaded: false, error: action.payload };
    default:
      return state;
  }
}

export function filters(
  state = defaultState.filters,
  action: Actions,
): Filters {
  switch (action.type) {
    case "filters/applied":
      return { ...state, ...action.payload };
    case "filters/reset":
      return defaultState.filters;
    default:
      return state;
  }
}
