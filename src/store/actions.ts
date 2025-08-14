import type { AppThunk } from ".";
import { getLatestAdverts } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";

/**
 * Login
 */

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

/**
 * Logout
 */

type AuthLogout = {
  type: "auth/logout";
};

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

/**
 * Adverts
 */
type AdvertsLoadedPending = {
  type: "adverts/loaded/pending";
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsLoadedRejected = {
  type: "adverts/loaded/rejected";
  payload: Error;
};

export const advertsLoadedPending = (): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
});

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
  type: "adverts/loaded/rejected",
  payload: error,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const adverts = await getLatestAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

/**
 * Advert Detail
 */

/**
 * New Advert
 */

export const advertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

type AdvertsCreated = {
  type: "adverts/created";
  payload: Advert;
};

/**
 * Error
 */

type UiResetError = {
  type: "ui/reset-error";
};

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedPending
  | AdvertsLoadedFulfilled
  | AdvertsLoadedRejected
  | UiResetError
  | AdvertsCreated;
