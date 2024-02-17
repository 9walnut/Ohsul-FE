import React from "react";

import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardColTag from "./CardColTag";

function SlickSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Box>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="Score"
          />
        </Box>
        <Box>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="Score"
          />
        </Box>
        <Box>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="Score"
          />
        </Box>
        <Box>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="Score"
          />
        </Box>
        <Box>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="Score"
          />
        </Box>
      </Slider>
    </div>
  );
}

export default SlickSlider;

const Box = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`;
