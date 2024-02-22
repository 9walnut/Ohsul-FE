import React, { useState } from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";
import KakaoMap07 from "../../components/common/KakaoMap07";
import TagBox from "../../components/ohsulTag/TagBox";
import { SearchResult } from "../../types/Map";
import CardColReview from "../../components/common/CardColReview";

const SearchAlcoholPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };

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
      <KakaoMap07 onSearchResults={handleSearchResults} />
      <TagBox checkedTags={DUMMYTags} />
      {/* dot Img */}
      <img src="/assets/images/border_dot.png" alt="border_dot" />
      {/* <ul>
        {searchResults.map((result, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{result.name}</strong>
            <br />
            {result.address}
            <br />
            {result.phone}
          </li>
        ))}
      </ul> */}
      {searchResults.map((result, index) => (
        <CardColReview barName={result.name} key={index} />
      ))}
    </>
  );
};

export default SearchAlcoholPage;
