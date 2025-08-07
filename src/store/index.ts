import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers(reducers);

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    // // @ts-expect-error: import devtools extension
    // window.REDUX_DEVTOOLS_EXTENSION &&
    // // @ts-expect-error: import devtools extension
    //  window.REDUX_DEVTOOLS_EXTENSION(),
    composeWithDevTools(),
  );
  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
