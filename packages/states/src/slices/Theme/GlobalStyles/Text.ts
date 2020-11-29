import { Property } from "csstype";

interface ITextTypeSize {
  Title: Property.FontSize;
  subTitle: Property.FontSize;
  Body: Property.FontSize;
  Button: Property.FontSize;
}

export interface IText {
  font_family: {
    // edit
    heading: Property.Font;
    body: Property.Font;
  };
  font_size: ITextTypeSize;
  font_weight: {
    // remove
    light: Property.FontSize;
    regular: Property.FontSize;
    bold: Property.FontSize;
  };
}
const text: IText = {
  font_family: {
    heading: '"Merriweather", Georgia, serif',
    body: '"Open Sans", Helvetica, Arial, sans-serif',
  },
  font_size: {
    Title: "2rem",
    subTitle: "1.5rem",
    Body: "1rem",
    Button: ".8rem",
  },
  font_weight: {
    light: "200",
    regular: "400",
    bold: "700",
  },
};
export default text;
