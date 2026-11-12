// Type scale from the design system. Mirrors the .h1, .h2, .body-md... classes in global.css.
export const typography = {
  h1: { fontFamily: "Poppins-Bold", fontSize: 32, lineHeight: 38.4 },
  h2: { fontFamily: "Poppins-SemiBold", fontSize: 24, lineHeight: 31.2 },
  h3: { fontFamily: "Poppins-SemiBold", fontSize: 20, lineHeight: 26 },
  h4: { fontFamily: "Poppins-Medium", fontSize: 16, lineHeight: 22.4 },
  bodyLarge: { fontFamily: "Poppins-Regular", fontSize: 16, lineHeight: 25.6 },
  bodyMedium: { fontFamily: "Poppins-Regular", fontSize: 14, lineHeight: 22.4 },
  bodySmall: { fontFamily: "Poppins-Regular", fontSize: 13, lineHeight: 20.8 },
  caption: { fontFamily: "Poppins-Regular", fontSize: 11, lineHeight: 15.4 },
} as const;
