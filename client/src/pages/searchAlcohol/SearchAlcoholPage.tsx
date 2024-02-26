import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";
import KakaoMap07 from "../../components/common/KakaoMap07";
import TagBox from "../../components/ohsulTag/TagBox";
import { SearchResult } from "../../types/Map";
import CardColReview from "../../components/common/CardColReview";
import axios from "axios";

const SearchAlcoholPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // 이 지역 재검색 클릭 시
  useEffect(() => {
    console.log("주소들어옴", searchResults);

    const phoneNumbers = searchResults
      .filter((result) => result.phone)
      .map((result) => result.phone.replace(/-/g, ""));

    const barNames = searchResults
      .filter((result) => result.name)
      .map((result) => result.name);

    console.log("번호 모음", phoneNumbers);
    postStoreInfo(phoneNumbers, barNames);
  }, [searchResults]);

  const postStoreInfo = async (phoneNumbers: string[], barNames: string[]) => {
    const data = {
      telephones: phoneNumbers,
      barNames: barNames,
    };
    console.log("보내는 데이터임", data);

    try {
      const res = await axios.post("/api/ohsul/searchAlcohol", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("알코올 응답", res);
      console.log("알콜 응답 데이터 ~!!~!", res.data);
    } catch (error) {
      console.log("알콜 응답 에러", error);
    }
  };

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };

  const handleBarPhone = (phone: string) => {
    return phone.replace(/-/g, "");
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
        <CardColReview
          barName={result.name}
          key={index}
          barPhone={handleBarPhone(result.phone)}
        />
      ))}
    </>
  );
};

export default SearchAlcoholPage;
