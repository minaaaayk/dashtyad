export interface IMediaQuery {
  Phone: string; // Extra small devices (portrait phones, less than 319px)
  LandscapePhone: string; // Small devices (landscape phones, 319px and up)
  Tablet: string; // Medium devices (Small tablets, 424px and up)
  LargeTablet: string; // Relatively large devices (Large tablets, 768px and up)
  Desktop: string; // Large devices (desktops, 992px and up)
  LargeDesktop: string; // Extra large devices (large desktops, 1023px and up)
}

export const customMediaQuery = (minWidth?: number, maxWidth?: number) => {
  const mediaString =
    minWidth && maxWidth
      ? `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}px)`
      : minWidth
      ? `@media (min-width: ${minWidth}px)`
      : maxWidth
      ? `@media (max-width: ${maxWidth}px)`
      : "";
  return mediaString;
};

export const media: IMediaQuery = {
  Phone: customMediaQuery(undefined, 318.99),
  LandscapePhone: customMediaQuery(319, 423.99),
  Tablet: customMediaQuery(424, 767.98),
  LargeTablet: customMediaQuery(768, 991.99),
  Desktop: customMediaQuery(992, 1022.99),
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
