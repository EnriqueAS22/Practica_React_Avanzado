import type { AppThunk } from ".";
import {
  getAdvert,
  getLatestAdverts,
  createAdvert,
} from "../pages/advert/service";
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

type AdvertsCreatedPending = {
  type: "adverts/created/pending";
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
};

export const advertsCreatedPending = (): AdvertsCreatedPending => ({
  type: "adverts/created/pending",
});

export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsCreatedRejected = (
  error: Error,
): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});

export function advertsCreate(formData: FormData): AppThunk<Promise<Advert>> {
  return async function (dispatch) {
    dispatch(advertsCreatedPending());
    try {
      const createdAdvert = await createAdvert(formData);
      const advert = await getAdvert(createdAdvert.id);
      dispatch(advertsCreatedFulfilled(advert));
      return advert;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsCreatedRejected(error));
      }
      throw error;
    }
  };
}

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
  | AdvertsCreatedPending
  | AdvertsCreatedFulfilled
  | AdvertsCreatedRejected;
