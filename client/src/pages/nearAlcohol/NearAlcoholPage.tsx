import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchResult } from "../../types/Map";
import { Card, getBarInfo } from "../../types/Common";

import Header from "../../components/common/Header";
import CardColTag from "../../components/common/CardColTag";
import Toggle2 from "../../components/nearAlcohol/Toggle2";
import KakaoMap07 from "../../components/common/KakaoMap07";

import CardColReview from "../../components/common/CardColReview";

type CombinedData = (SearchResult | getBarInfo)[];

interface BarDataTypes {
  barName: string;
  roadAddress: string;
  telephone: string;
}

const NearAlcoholPage: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [fetchBarData, setFetchBarData] = useState<SearchResult[]>([]);
  // const [barData, setBarData] = useState<CombinedData>([]);
  const [barInfo, setBarInfo] = useState([]);

  //view mode - 지도 보기 , 리스트 보기
  const handleViewChange = (newViewMap: boolean) => {
    setViewMap(newViewMap);
  };

  //지도 결과 가져오는 콜백함수
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };
  // 이 지역 재검색 클릭 시
  useEffect(() => {
    console.log("주소들어옴", searchResults);

    const barData: BarDataTypes[] = searchResults.map((result) => ({
      barName: result.name,
      roadAddress: result.address,
      telephone: result.phone ? result.phone.replace(/-/g, "") : "",
    }));

    postStoreInfo(barData);
  }, [searchResults]);

  const postStoreInfo = async (barData: BarDataTypes[]) => {
    console.log("보내는 데이터임", barData);

    try {
      const res = await axios.post("/api/ohsul/near", barData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setBarInfo(res.data);

        // // 검색 결과와 응답 데이터를 합친 배열을 생성
        // // 더미데이터에 없으면 barId 안들어옴 -> 데이터 보내면서 생성되고 barid 가져와야 될 듯
        // const combinedData = searchResults.map((searchResult) => {
        //   const matchedData = fetchData.find(
        //     (data) => data.barName === searchResult.name
        //   );
        //   if (matchedData) {
        //     return {
        //       ...searchResult,
        //       barId: matchedData.barId,
        //       barImg: matchedData.barImg,
        //       alcoholTags: matchedData.alcoholTags,
        //       moodTags: matchedData.moodTags,
        //       musicTags: matchedData.musicTags,
        //     };
        //   }
        //   return searchResult;
        // });
        // setBarData(combinedData);
        console.log("barData: ", barData);
      }
    } catch (error) {
      console.log("알콜 응답 에러", error);
    }
  };

  const handleBarPhone = (phone: string) => {
    return phone.replace(/-/g, "");
  };

  return (
    <>
      <Header title="내 주변의 술" />
      <KakaoMap07 onSearchResults={handleSearchResults} />
      {barInfo &&
        barInfo.map((result, index) => (
          <CardColTag
            key={index}
            // @ts-ignore
            barName={result.name}
            // @ts-ignore
            barPhone={handleBarPhone(result.phone)}
            // @ts-ignore
            barId={result.barId}
          />
        ))}

      {viewMap ? <p>지도 보기 컴포넌트</p> : <p>리스트 보기 컴포넌트</p>}
      <Toggle2 viewMap={viewMap} onViewChange={handleViewChange} />
    </>
  );
};

export default NearAlcoholPage;

const PageLayout = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;
