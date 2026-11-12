// Lets TypeScript import image files: import logo from "@/assets/images/logo.png"
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";
  const source: ImageSourcePropType;
  export default source;
}
