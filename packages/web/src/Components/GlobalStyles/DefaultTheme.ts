import { breakpoints, media } from "./BreackPoints";
import { colors } from "./Colors";
import { space } from "./Space";
import { Theme } from "./StyleTypes";
import text from "./Text";

export const defaultTheme: Theme = {
  space: {
    ...space,
  },
  breakpoints: breakpoints,
  media: {
    ...media,
  },
  colors: {
    ...colors,
  },
  text: {
    ...text,
  },
};
