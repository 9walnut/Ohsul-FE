import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";
import KakaoMap07 from "../../components/common/KakaoMap07";
import TagBox from "../../components/ohsulTag/TagBox";
import { SearchResult } from "../../types/Map";
import CardColReview from "../../components/common/CardColReview";
import axios from "axios";

interface BarDataTypes {
  barName: string[];
  roadAddress: string[];
  telephone: string[];
}

interface TransformedSearchResult {
  barName: string;
  roadAddress: string;
  telephone: string;
}

const SearchAlcoholPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [BarInfo, setBarInfo] = useState([]);

  // 이 지역 재검색 클릭 시
  useEffect(() => {
    console.log("주소들어옴", searchResults);

    // const barData: BarDataTypes = {
    //   barName: searchResults.map((result) => result.name),
    //   roadAddress: searchResults.map((result) => result.address),
    //   telephone: searchResults.map((result) =>
    //     result.phone ? result.phone.replace(/-/g, "") : ""
    //   ),
    // };

    const transformedData: BarDataTypes[] = searchResults.map((result) => ({
      barName: [result.name],
      roadAddress: [result.address],
      telephone: result.phone ? [result.phone.replace(/-/g, "")] : [""],
    }));

    postStoreInfo(transformedData); // API 호출 시, 객체를 배열로 감싸서 보내기
  }, [searchResults]);

  const postStoreInfo = async (transformedData: BarDataTypes[]) => {
    console.log("보내는 데이터임", transformedData);

    try {
      const res = await axios.post("/api/ohsul/near", transformedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("알코올 응답", res);
      console.log("알콜 응답 데이터 ~!!~!", res.data);
      setBarInfo(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Review submission error: ", error.message);
        if (error.response) {
          console.error("Response data: ", error.response.data);
          console.error("Status code: ", error.response.status);
        }
      } else {
        console.error("An error occurred: ", error);
      }
    }
  };

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
      {BarInfo.map((result, index) => (
        <CardColReview
          // @ts-ignore
          barId={result.barId}
          // @ts-ignore
          barName={result.barName}
          key={index}
          // @ts-ignore
          barPhone={result.telephone}
        />
      ))}
    </>
  );
};

export default SearchAlcoholPage;
