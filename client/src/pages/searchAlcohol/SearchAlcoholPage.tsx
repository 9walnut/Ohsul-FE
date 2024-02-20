import React from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";
import KakaoMap07 from "../../components/common/KakaoMap07";
import TagBox from "../../components/ohsulTag/TagBox";

const SearchAlcoholPage: React.FC = () => {
  //오술태그 선택된 값 넣기
  const DUMMYTags = {
    alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
    music: ["music_3", "music_5"],
    mood: ["mood_1", "mood_3"],
    etc: ["etc_1"],
    snack: ["snack_2"],
  };

  return (
    <>
      <Header title="오늘의 술 찾기" />
      <KakaoMap07 />
      <TagBox checkedTags={DUMMYTags} disabled={true} />
      <img src="/assets/images/border_dot.png" alt="border_dot" />
      CardCol ~~ㅋㅋ
    </>
  );
};

export default SearchAlcoholPage;
