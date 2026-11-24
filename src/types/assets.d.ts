// Metro resolves image imports to an asset id (number).
declare module "*.png" {
  const source: number;
  export default source;
}
