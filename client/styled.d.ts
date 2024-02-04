import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      back: string;
      main: string;
      black: string;
      white: string;
      card: string;
    };
  }
}
