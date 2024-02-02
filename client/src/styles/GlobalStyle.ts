import { createGlobalStyle } from "styled-components";
import YeongdeokSea from "./fonts/YeongdeokSea.woff";
import PretendardBlack from "./fonts/PretendardBlack.woff";
import PretendardBold from "./fonts/PretendardBold.woff";
import PretendardExtraBold from "./fonts/PretendardExtraBold.woff";
import PretendardExtraLight from "./fonts/PretendardExtraLight.woff";
import PretendardLight from "./fonts/PretendardLight.woff";
import PretendardMedium from "./fonts/PretendardMedium.woff";
import PretendardRegular from "./fonts/PretendardRegular.woff";
import PretendardSemiBold from "./fonts/PretendardSemiBold.woff";
import PretendardThin from "./fonts/PretendardThin.woff";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'YeongdeokSea';
    src: url(${YeongdeokSea}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardBlack';
    src: url(${PretendardBlack}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardBold';
    src: url(${PretendardBold}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardExtraBold';
    src: url(${PretendardExtraBold}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardExtraLight';
    src: url(${PretendardExtraLight}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardLight';
    src: url(${PretendardLight}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardMedium';
    src: url(${PretendardMedium}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardRegular';
    src: url(${PretendardRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardSemiBold';
    src: url(${PretendardSemiBold}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'PretendardThin';
    src: url(${PretendardThin}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
 
html,
applet,
object,
iframe,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
center,
fieldset,
form,
label,
legend,
table,
caption,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
hgroup,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

`;
