import { combineReducers, Action } from "redux";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { notebooks } from "../slices/notebook";

export const webReducer = combineReducers({
  wares: notebooks.reducer,
});
export const webStore = configureStore({ reducer: webReducer });

export type WebState = ReturnType<typeof webReducer>;

export type WebDispatch = typeof webStore.dispatch;

export type WebAppThunk = ThunkAction<void, WebState, unknown, Action<string>>;
