import type { AppThunk } from ".";
import type { Advert } from "../pages/advert/types";
import type { Credentials } from "../pages/auth/types";
import { getAdvert } from "./selectors";

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
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginFulfilled());

      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
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
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const adverts = await api.adverts.getLatestAdverts();
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

type AdvertDetailFulfilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

export const advertDetailFulfilled = (
  advert: Advert,
): AdvertDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export function advertsDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertDetailFulfilled(advert));
    } catch (error) {
      throw error;
    }
  };
}

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
  return async function (dispatch, _getState, { api, router }) {
    dispatch(advertsCreatedPending());
    try {
      const createdAdvert = await api.adverts.createAdvert(formData);
      const advert = await api.adverts.getAdvert(createdAdvert.id);
      dispatch(advertsCreatedFulfilled(advert));
      router.navigate(`/adverts/${createdAdvert.id}`);
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
  | AdvertsCreatedRejected
  | AdvertDetailFulfilled;
