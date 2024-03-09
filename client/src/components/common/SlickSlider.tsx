import React from "react";

import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardRow from "./CardRow";
interface Bar {
  barId: number;
  barName: string;
  barImg: string;
  alcoholTags: Array<number>;
  musicTags: Array<number>;
  moodTags: Array<number>;
  barAvgScore: number;
}

interface BarData {
  bars: Bar[];
  bar: Bar;
}

const SlickSlider: React.FC<BarData> = ({ bars }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    //slidesToShow: 2.5,
    //slidesToScroll: 2.5,
    slidesToShow: bars.length > 2 ? 2.5 : bars.length,
    slidesToScroll: bars.length > 2 ? 2.5 : bars.length,
    centerMode: false,
    //slider ui 보완 필요
    //centerPadding: "200px",
  };

  return (
    <div className="slider-container">
      <CustomSlider {...settings}>
        {bars && bars.length > 0 ? (
          bars.slice(0, 5).map((bar, index) => (
            <Box key={index}>
              <CardRow bar={bar} />
            </Box>
          ))
        ) : (
          <MsgBox>
            <div>술집 정보가 없습니다🥹</div>
          </MsgBox>
        )}
      </CustomSlider>
    </div>
  );
};

export default SlickSlider;
const CustomSlider = styled(Slider)`
  position: relative;
  display: inline-block;
  width: 430px;
  height: 200px;
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
  height: 200px;
  margin-bottom: 40px;
`;
const MsgBox = styled.div`
  width: 130px;
  height: 200px;
  margin-bottom: 40px;
  margin-left: -20px;
`;
