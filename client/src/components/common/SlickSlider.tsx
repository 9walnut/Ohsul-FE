import React from "react";

import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardRow from "./CardRow";

function SlickSlider() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.7,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container">
      <CustomSlider {...settings}>
        <Box>
          <CardRow barName="1번" />
        </Box>
        <Box>
          <CardRow barName="2번" />
        </Box>
        <Box>
          <CardRow barName="3번" />
        </Box>
        <Box>
          <CardRow barName="4번" />
        </Box>
        <Box>
          <CardRow barName="5번" />
        </Box>
      </CustomSlider>
    </div>
  );
}

export default SlickSlider;
const CustomSlider = styled(Slider)`
  position: relative;
  display: inline-block;
  width: 430px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin: 5px 100px;
  padding: 20px;
`;
const SliderLayout = styled.div`
  width: 100px;
  height: auto;
`;
const Box = styled.div`
  width: 130px;
  height: 200px;
  margin-bottom: 40px;
`;
