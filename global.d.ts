declare module "react" {
  // @ts-types="npm:@types/react@^18"
  import lib from "npm:react@^18";
  // @ts-ignore: Don't warn.
  export = lib;
}

declare module "react-dom" {
  // @ts-types="npm:@types/react-dom@^18"
  import lib from "npm:react-dom@^18";
  // @ts-ignore: Don't warn.
  export = lib;
}
