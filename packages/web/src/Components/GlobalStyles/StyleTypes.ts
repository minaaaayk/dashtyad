import { Property } from "csstype";

/********
 *********
 *Coloring
 *********
 *********/
export interface ThemeColors {
  primary: {
    primary1: Property.Color;
    primary2: Property.Color;
  };
  secondary: {
    secondary1: Property.Color;
    secondary2: Property.Color;
  };
  link: Property.Color;
  success: Property.Color;
  warning: Property.Color;
  error: Property.Color;
  heading: Property.Color;
  text: Property.Color;
  disabled: Property.Color;
  border: Property.Color;
}

/********
 *********
 **Text***
 *********
 *********/
interface HeadingType {
  h1: Property.FontSize;
  h2: Property.FontSize;
  h3?: Property.FontSize;
  h4?: Property.FontSize;
  h5?: Property.FontSize;
  h6?: Property.FontSize;
}
interface BodyType {
  regular: Property.FontSize;
}

interface GeneralSize<T> {
  // Extra small devices (portrait phones, less than 319px)
  Phone: T;
  // Small devices (landscape phones, 319px and up)
  LandscapePhone: T;
  // Medium devices (Small tablets, 424px and up)
  Tablet: T;
  // Relatively large devices (Large tablets, 768px and up)
  LargeTablet: T;
  // Large devices (desktops, 992px and up)
  Desktop: T;
  // Extra large devices (large desktops, 1023px and up)
  LargeDesktop: T;
}
export interface ThemeText {
  font: {
    heading: Property.Font;
    body: Property.Font;
  };
  size: {
    heading: GeneralSize<HeadingType>;
    body: GeneralSize<BodyType>;
  };
  weight: {
    light: Property.FontSize;
    regular: Property.FontSize;
    bold: Property.FontSize;
  };
}

/********
 *********
 **Space**
 *********
 *********/
export interface Space {
  NONE: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface MediaQuary {
  // Extra small devices (portrait phones, less than 319px)
  Phone: string;

  // Small devices (landscape phones, 319px and up)
  LandscapePhone: string;

  // Medium devices (Small tablets, 424px and up)
  Tablet: string;

  // Relatively large devices (Large tablets, 768px and up)
  LargeTablet: string;

  // Large devices (desktops, 992px and up)
  Desktop: string;

  // Extra large devices (large desktops, 1023px and up)
  LargeDesktop: string;
}
/**************
 ***************
 *Default Theme*
 ***************
 ***************/
export interface Theme {
  space: Space;
  breakpoints: string[];
  media: MediaQuary;
  colors: ThemeColors;
  text: ThemeText;
}
