import { ThemeText } from "./StyleTypes";

const text: ThemeText = {
  font: {
    heading: '"Merriweather", Georgia, serif',
    body: '"Open Sans", Helvetica, Arial, sans-serif',
  },
  size: {
    heading: {
      Phone: {
        h1: "1rem",
        h2: ".5rem",
      },
      LandscapePhone: {
        h1: "1rem",
        h2: ".5rem",
      },
      Tablet: {
        h1: "1rem",
        h2: ".5rem",
      },
      LargeTablet: {
        h1: "1rem",
        h2: ".5rem",
      },
      Desktop: {
        h1: "1rem",
        h2: ".5rem",
      },
      LargeDesktop: {
        h1: "1rem",
        h2: ".5rem",
      },
    },
    body: {
      Phone: { regular: "1rem" },
      LandscapePhone: { regular: "1rem" },
      Tablet: { regular: "1rem" },
      LargeTablet: { regular: "1rem" },
      Desktop: { regular: "1rem" },
      LargeDesktop: { regular: "1rem" },
    },
  },
  weight: {
    light: "200",
    regular: "400",
    bold: "700",
  },
};
export default text;
