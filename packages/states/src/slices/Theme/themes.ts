import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISpace, space } from "./GlobalStyles/Space";
import { IMediaQuery, media } from "./GlobalStyles/MediaQuery";
import { colors, IThemeColors } from "./GlobalStyles/Colors";
import text, { IText } from "./GlobalStyles/Text";

export interface UIState {
  space: ISpace; // rem
  media: IMediaQuery; // rem
  colors: IThemeColors;
  text: IText;
  navTitle: string;
}

export const UiInitialState: UIState = {
  space: {
    ...space,
  },
  media: {
    ...media,
  },
  colors: {
    ...colors,
  },
  text: {
    ...text,
  },
  navTitle: "",
};

export const theme = createSlice({
  name: "theme",
  initialState: UiInitialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.navTitle = action.payload;
    },
  },
});

export const { setTitle } = theme.actions;
