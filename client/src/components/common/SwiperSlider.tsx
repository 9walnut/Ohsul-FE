import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

const SWIPER_INLINE_OPTIONS = {
  direction: "horizontal",
  longSwipes: true,
  longSwipesRatio: 0,
  resistance: true,
  resistanceRatio: 0,
  slidesPerView: "auto" as const,
};

const SwiperSlider: React.FC = () => {
  return (
    <>
      <Wrapper>
        <List>
          {/* @ts-ignore */}
          <Swiper {...SWIPER_INLINE_OPTIONS}>
            {[1, 2, 3, 4, 5].map((_) => (
              <SwiperSlide>
                <Card />
              </SwiperSlide>
            ))}
          </Swiper>
        </List>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

const List = styled.div`
  margin-top: 30px;
  .swiper {
    .swiper-slide {
      width: auto !important;
      margin-right: 15px;
    }
  }
`;

const Card = styled.div`
  background-color: aliceblue;
  width: 150px;
  height: 150px;
`;

export default SwiperSlider;
