import type { AppThunk } from ".";
import { getLatestAdverts } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsCreated = {
  type: "adverts/created";
  payload: Advert;
};

type UiResetError = {
  type: "ui/reset-error";
};

/**
 * Action Creator
 */

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

/**
 * Action creator thunk
 */
export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts) {
      return;
    }
    try {
      // Manage advertsLoadedPending
      const adverts = await getLatestAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      // Manage advertsLoadedRejected
      console.log(error);
    }
  };
}

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | UiResetError
  | AdvertsCreated;
