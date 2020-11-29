import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type loader = "get" | "create" | "delete" | "update";
export interface errorMsg {
  type: loader;
  message: string;
}
export interface INotebooksState {
  items: string[];
  errors: { [l in loader]: string | null };
  loaders: { [l in loader]: boolean };
  reachEnd: boolean;
  resetItems: boolean;
  variables: string;
}

export const notebookInitialState: INotebooksState = {
  items: [],
  loaders: {
    create: false,
    get: false,
    delete: false,
    update: false,
  },
  errors: { create: null, get: null, delete: null, update: null },
  reachEnd: false,
  resetItems: false,
  variables: "",
};

export type notebooksFilterPayload = { name: string; value: any };

export const notebooks = createSlice({
  name: "notebooks",
  initialState: notebookInitialState,
  reducers: {
    notebooksInit(state, action: PayloadAction<loader>) {
      state.errors[action.payload] = null;
      state.loaders[action.payload] = true;
    },
    setReachEnd(state) {
      state.reachEnd = true;
    },
    notebooksFailed(state, action: PayloadAction<errorMsg>) {
      const { type, message } = action.payload;
      state.errors[type] = message;
      state.loaders[type] = false;
    },
    setNotebooksFilter(state, action: PayloadAction<notebooksFilterPayload>) {
      const { name, value } = action.payload;
      state.variables[name] = value;
    },
    getNotebooksSuccess(state, action: PayloadAction) {
      state.errors["get"] = null;
      state.loaders["get"] = false;
      state.resetItems = false;
    },
    createNotebookSuccess(state, action: PayloadAction) {
      state.errors["create"] = null;
      state.loaders["create"] = false;
      state.resetItems = false;
    },
    deleteNotebookSuccess(state, action: PayloadAction) {
      state.errors["delete"] = null;
      state.loaders["delete"] = false;
      state.resetItems = false;
    },
    updateNotebookSuccess(state, action: PayloadAction) {
      state.errors["update"] = null;
      state.loaders["update"] = false;
      state.resetItems = false;
    },
  },
});

export const {
  notebooksInit: notebooksInit,
  setReachEnd,
  notebooksFailed,
  setNotebooksFilter,
  getNotebooksSuccess,
  createNotebookSuccess,
  deleteNotebookSuccess,
  updateNotebookSuccess,
} = notebooks.actions;
