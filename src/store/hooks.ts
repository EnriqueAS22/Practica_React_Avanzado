import { useAppDispatch, useAppSelector } from ".";
import {
  authLoginFulfilled,
  authLoginPending,
  authLoginRejected,
  authLogout,
  uiResetError,
} from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginActionPending() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLoginPending());
  };
}

export function useLoginActionFulfilled() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLoginFulfilled());
  };
}

export function useLoginActionRejected() {
  const dispatch = useAppDispatch();
  return function (error: Error) {
    return dispatch(authLoginRejected(error));
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
