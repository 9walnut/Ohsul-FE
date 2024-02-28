import React from "react";

import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardRowTag from "./CardRowTag";
interface Bar {
  barId: number;
  barName: string;
  barImg: string;
  alcoholTags: number[];
  musicTags: number[];
  moodTags: number[];
  barAvgScore: number;
}

interface BarData {
  bars: Bar[];
  bar: Bar;
}

const SlickSliderTag: React.FC<BarData> = ({ bars }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2.5,
  };
  console.log(bars);

  return (
    <div className="slider-container">
      <CustomSlider {...settings}>
        {bars && bars.length > 0 ? (
          bars.slice(0, 5).map((bar, index) => (
            <Box key={index}>
              <CardRowTag bar={bar} />
            </Box>
          ))
        ) : (
          <div>술집 정보가 없습니다🥹</div>
        )}
      </CustomSlider>
    </div>
  );
};

export default SlickSliderTag;

const CustomSlider = styled(Slider)`
  position: relative;
  display: inline-block;
  width: 430px;
  height: 220px;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px 20px;
`;

const SliderLayout = styled.div`
  width: 100px;
  height: auto;
`;

const Box = styled.div`
  width: 130px;
  height: 220px;
  margin-bottom: 40px;
`;
