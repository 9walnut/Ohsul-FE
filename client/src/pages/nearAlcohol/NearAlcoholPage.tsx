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

type CombinedData = (SearchResult | getBarInfo)[];

const NearAlcoholPage: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [fetchBarData, setFetchBarData] = useState<SearchResult[]>([]);
  const [barData, setBarData] = useState<CombinedData>([]);

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
      const res = await axios.post("/api/ohsul/near", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const fetchData: any[] = res.data; // 응답 데이터 타입을 any 배열로 지정

        // 검색 결과와 응답 데이터를 합친 배열을 생성
        // 더미데이터에 없으면 barId 안들어옴 -> 데이터 보내면서 생성되고 barid 가져와야 될 듯
        const combinedData = searchResults.map((searchResult) => {
          const matchedData = fetchData.find(
            (data) => data.barName === searchResult.name
          );
          if (matchedData) {
            return {
              ...searchResult,
              barId: matchedData.barId,
              barImg: matchedData.barImg,
              alcoholTags: matchedData.alcoholTags,
              moodTags: matchedData.moodTags,
              musicTags: matchedData.musicTags,
            };
          }
          return searchResult;
        });
        setBarData(combinedData);

        console.log("combinedData: ", combinedData);
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
      <PageLayout>
        <Header title="내 주변의 술" />
        <KakaoMap07 onSearchResults={handleSearchResults} />
        {barData &&
          barData.map((result, index) => (
            <CardColTag
              key={index}
              barName={result.name}
              barPhone={handleBarPhone(result.phone)}
              barId={result.barId}
            />
          ))}
        {/* {barData &&
          barData.map((result) => {
            if ("barId" in result) {
              return (
                <CardColTag
                  key={result.barId}
                  barName={result.name}
                  barPhone={handleBarPhone(result.phone)}
                />
              );
            } else {
              return null; // SearchResult 타입인 경우 처리
            }
          })} */}
        {/* {searchResults.map((result, index) => (
          <CardColReview
            barName={result.name}
            key={index}
            barPhone={handleBarPhone(result.phone)}
          />
        ))} */}
        {/* <CardColTag
          barId={DUMMYCardColTag.barId}
          barName={DUMMYCardColTag.barName}
          score={DUMMYCardColTag.score}
          barImg={DUMMYCardColTag.barImg}
          tag={DUMMYCardColTag.tag}
        /> */}
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
