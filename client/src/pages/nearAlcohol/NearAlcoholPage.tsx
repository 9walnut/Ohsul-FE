import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchResult } from "../../types/Map";
import { Card, FavoriteBar, getBarInfo } from "../../types/Common";

import Header from "../../components/common/Header";
import CardColTag from "../../components/common/CardColTag";
import Toggle2 from "../../components/nearAlcohol/Toggle2";
import KakaoMap07 from "../../components/common/KakaoMap07";
import KakaoMap08 from "../../components/common/KakaoMap08";

import CardColReview from "../../components/common/CardColReview";

interface BarDataTypes {
  barName: string;
  roadAddress: string;
  telephone: string;
}

const NearAlcoholPage: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [barInfo, setBarInfo] = useState<FavoriteBar[]>([]);

  //view mode - 지도 보기 , 리스트 보기
  const handleViewChange = (newViewMap: boolean) => {
    setViewMap(newViewMap);
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
        console.log("알코올 응답", res);
        console.log("알콜 응답 데이터 ~!!~!", res.data);
        setBarInfo(res.data);
        console.log(barInfo, "barInfo");
      }
    } catch (error) {
      console.log("알콜 응답 에러", error);
    }
  };
  //지도 결과 가져오는 콜백함수
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };
  const handleBarPhone = (phone: string) => {
    return phone.replace(/-/g, "");
  };

  return (
    <>
      <NearAlcoholPageLayout>
        <Header title="내 주변의 술" />

        {viewMap ? (
          <>
            <KakaoMap08 onSearchResults={handleSearchResults} />
          </>
        ) : (
          <>
            {barInfo &&
              barInfo.map((result, index) => (
                <CardColTag
                  key={index}
                  barImg={result.barImg}
                  alcoholTags={result.alcoholTags}
                  moodTags={result.alcoholTags}
                  musicTags={result.musicTags}
                  barName={result.barName}
                  barId={result.barId}
                  score={result.barAvgScore}
                />
              ))}
          </>
        )}
        <Toggle2 viewMap={viewMap} onViewChange={handleViewChange} />
      </NearAlcoholPageLayout>
    </>
  );
};

export default NearAlcoholPage;

const NearAlcoholPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;
