import { combineReducers, createStore, applyMiddleware } from "redux";
import * as reducers from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as thunk from "redux-thunk";
import type { Actions } from "./actions";
import * as adverts from "../pages/advert/service";
import * as auth from "../pages/auth/service";

const rootReducer = combineReducers(reducers);

type ExtraArgument = { api: { auth: typeof auth; adverts: typeof adverts } };

export default function configureStore(
  preloadedState: Partial<reducers.State>,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    // // @ts-expect-error: import devtools extension
    // window.REDUX_DEVTOOLS_EXTENSION &&
    // // @ts-expect-error: import devtools extension
    //  window.REDUX_DEVTOOLS_EXTENSION(),
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
          api: { adverts, auth },
        }),
      ),
    ),
  );
  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
