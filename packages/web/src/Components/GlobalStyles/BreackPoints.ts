import { MediaQuary } from "./StyleTypes";

export const breakpoints: string[] = [
  "319px",
  "424px",
  "768px",
  "992px",
  "1023px",
];
const customMediaQuery = (minWidth?: number, maxWidth?: number) => {
  const mediaString =
    minWidth && maxWidth
      ? `@media (max-width: ${maxWidth}px)`
      : minWidth
      ? `@media (min-width: ${minWidth}px)`
      : maxWidth
      ? `@media (max-width: ${maxWidth}px)`
      : "";
  return mediaString;
};

export const media: MediaQuary = {
  // Extra small devices (portrait phones, less than 319px)
  Phone: customMediaQuery(undefined, 318.99),

  // Small devices (landscape phones, 319px and up)
  LandscapePhone: customMediaQuery(319, 423.99),

  // Medium devices (Small tablets, 424px and up)
  Tablet: customMediaQuery(424, 767.98),

  // Relatively large devices (Large tablets, 768px and up)
  LargeTablet: customMediaQuery(768, 991.99),

  // Large devices (desktops, 992px and up)
  Desktop: customMediaQuery(992, 1022.99),

  // Extra large devices (large desktops, 1023px and up)
  LargeDesktop: customMediaQuery(1023, 1022.99),
};

// Example Of use this:
//
// const Content = styled.div`
//   height: 3em;
//   width: 3em;
//   background: papayawhip;
//   /* Now we have our methods on media and can use them instead of raw queries */
//   ${media.Desktop} {
//     background: dodgerblue;
//   }
//   ${media.Tablet} {
//     background: mediumseagreen;
//   }
//   ${media.Phone} {
//     background: palevioletred;
//   }
// `;
