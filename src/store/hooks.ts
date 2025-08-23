import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import type { Credentials } from "../pages/auth/types";
import {
  authLogin,
  authLogout,
  filtersApplied,
  filtersReset,
  tagsLoaded,
  uiResetError,
} from "./actions";
import { areTagsLoaded, getFilters, getIsLogged, getTags } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials) {
    return dispatch(authLogin(credentials));
  };
}

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}

export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}

export function useTags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);
  const loaded = useAppSelector(areTagsLoaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(tagsLoaded());
    }
  }, [loaded, dispatch]);

  return tags;
}

export function useFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFilters);

  const applyFilters = (newFilters: typeof filters) => {
    dispatch(filtersApplied(newFilters));
  };

  const resetFilters = () => {
    dispatch(filtersReset());
  };

  return { filters, applyFilters, resetFilters };
}
