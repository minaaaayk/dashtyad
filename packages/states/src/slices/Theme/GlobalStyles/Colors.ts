import { Property } from "csstype";

export interface IThemeColors {
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

export const colors: IThemeColors = {
  primary: {
    primary1: "#423EA2",
    primary2: "#423EA2",
  },
  secondary: {
    secondary1: "#423EA2",
    secondary2: "#423EA2",
  },
  link: "#1890ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#e84118",
  heading: "#423EA2",
  text: "#000",
  disabled: "#f5222d",
  border: "#423EA2",
};
