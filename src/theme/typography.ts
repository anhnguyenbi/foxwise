// Design tokens: typography
// Keep these in sync with the `--font-*` / `--text-*` variables in global.css.

// Poppins font files. The keys MUST match the font's PostScript name.
export const fontFiles = {
  "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
} as const;

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

type TextStyleToken = {
  /** Where the style is used in the app */
  usage: string;
  fontSize: number;
  fontFamily: (typeof fontFamily)[keyof typeof fontFamily];
  /** Unitless multiplier of the font size */
  lineHeight: number;
};

export const typography = {
  h1: { usage: "Page / Screen Title", fontSize: 32, fontFamily: fontFamily.bold, lineHeight: 1.2 },
  h2: { usage: "Section Title", fontSize: 24, fontFamily: fontFamily.semibold, lineHeight: 1.3 },
  h3: { usage: "Card / Module Title", fontSize: 20, fontFamily: fontFamily.semibold, lineHeight: 1.3 },
  h4: { usage: "Subheading", fontSize: 16, fontFamily: fontFamily.medium, lineHeight: 1.4 },
  bodyLarge: { usage: "Important content", fontSize: 16, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  bodyMedium: { usage: "Body text", fontSize: 14, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  bodySmall: { usage: "Supporting text", fontSize: 13, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  caption: { usage: "Labels, meta text", fontSize: 11, fontFamily: fontFamily.regular, lineHeight: 1.4 },
} as const satisfies Record<string, TextStyleToken>;

export type TypographyToken = keyof typeof typography;
