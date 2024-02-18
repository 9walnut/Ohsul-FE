import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    bgColor: "#F4EDE6",
    bgLightColor: "#fcfaf9",
    mainBlue: "#7588A3",
    darkFont: "#3C3630",
    lightFont: "#FBF9F9",
    blueFont: "#4D607B",
    greyFont: "#646464",
    btnBlue: "#4D607B",
  },
  fonts: {
    ydFont: "YeongdeokSea",
  },
  isActive: {
    active: "#4D607B",
    nonActive: "#CCD2DB",
  },
};

export default theme;

//이러케 사용
//font-family: ${({ theme }) => theme.fonts.ydFont};
