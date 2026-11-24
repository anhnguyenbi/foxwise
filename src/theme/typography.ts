// Design tokens: typography (Poppins).
// Keep in sync with the `@theme` and `.text-*` utilities in src/global.css.
import type { FontSource } from "expo-font";

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// Passed to `useFonts` in the root layout.
export const fontAssets: Record<string, FontSource> = {
  [fontFamily.regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
  [fontFamily.medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
  [fontFamily.semibold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamily.bold]: require("@/assets/fonts/Poppins-Bold.ttf"),
};

export const typography = {
  h1: { fontSize: 32, fontFamily: fontFamily.bold, lineHeight: 1.2 },
  h2: { fontSize: 24, fontFamily: fontFamily.semibold, lineHeight: 1.3 },
  h3: { fontSize: 20, fontFamily: fontFamily.semibold, lineHeight: 1.3 },
  h4: { fontSize: 16, fontFamily: fontFamily.medium, lineHeight: 1.4 },
  bodyLarge: { fontSize: 16, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  bodyMedium: { fontSize: 14, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  bodySmall: { fontSize: 13, fontFamily: fontFamily.regular, lineHeight: 1.6 },
  caption: { fontSize: 11, fontFamily: fontFamily.regular, lineHeight: 1.4 },
} as const;
