import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchResult } from "../../types/Map";

import Header from "../../components/common/Header";
import CardColTag from "../../components/common/CardColTag";
import Toggle2 from "../../components/nearAlcohol/Toggle2";
import KakaoMap07 from "../../components/common/KakaoMap07";

import CardColReview from "../../components/common/CardColReview";

const DUMMYBarReviewCard = {
  userNickname: "졸린공룡",
  score: 4,
  barImg:
    "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
  tag: {
    drink: ["칵테일", "양주"],
    mood: ["다같이 즐기는", "이야기 나누기 적당한"],
    music: ["힙합"],
  },
  content:
    "이러코저러코 리뷰리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰리뷰리뷰리뷰 뷰가 들어와여 리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰없으면 공백! 85자 이내 작성!",
  date: "2024-02-22",
};
const DUMMYCardColTag = {
  barId: 2,
  barName: "언더그라운드",
  score: 4,
  barImg:
    "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
  tag: {
    drink: ["칵테일", "양주"],
    mood: ["다같이 즐기는", "힙한"],
    music: ["힙합"],
  },
};

const NearAlcoholPage: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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
    console.log("searchResults: ", searchResults);

    const phoneNumbers = searchResults
      .filter((result) => result.phone)
      .map((result) => result.phone.replace(/-/g, ""));

    console.log("result - phoneNumbers: ", phoneNumbers);
    postStoreInfo(phoneNumbers);
  }, [searchResults]);

  const postStoreInfo = async (phoneNumbers: string[]) => {
    console.log("postStoreInfo: ", phoneNumbers);
    try {
      const res = await axios.post("/api/ohsul/near", phoneNumbers, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("NearAlcoholPage res: ", res);
      console.log("NearAlcoholPage res.data: ", res.data);
    } catch (error) {
      console.log("NearAlcoholPage error: ", error);
    }
  };

  const handleBarPhone = (phone: string) => {
    return phone.replace(/-/g, "");
  };

  return (
    <>
      <PageLayout>
        <Header title="내 주변의 술" />
        <KakaoMap07 onSearchResults={handleSearchResults} />
        {/* {searchResults.map((result, index) => (
          <CardColTag
            barName={result.name}
            key={index}
            barPhone={handleBarPhone(result.phone)}
          />
        ))}
        {searchResults.map((result, index) => (
          <CardColReview
            barName={result.name}
            key={index}
            barPhone={handleBarPhone(result.phone)}
          />
        ))} */}
        <CardColTag
          barId={DUMMYCardColTag.barId}
          barName={DUMMYCardColTag.barName}
          score={DUMMYCardColTag.score}
          barImg={DUMMYCardColTag.barImg}
          tag={DUMMYCardColTag.tag}
        />
        {/* <p>얘는 가로형 카드 리뷰형</p>
        <CardColReview barName="언더그라운드" /> */}

        {viewMap ? <p>지도 보기 컴포넌트</p> : <p>리스트 보기 컴포넌트</p>}
        <Toggle2 viewMap={viewMap} onViewChange={handleViewChange} />
      </PageLayout>
    </>
  );
};

export default NearAlcoholPage;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
