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
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* <CardWrapper> */}
        <CardRow barName="언더그라운드" />
        <CardRow barName="언더그라운드" />
        <CardRow barName="언더그라운드" />
        <CardRow barName="언더그라운드" />
        <CardRow barName="언더그라운드" />
        {/* </CardWrapper> */}
      </Slider>
    </div>
  );
}

const CardWrapper = styled.div``;

export default SlickSlider;
