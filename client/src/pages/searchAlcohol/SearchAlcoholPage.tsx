import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";
import KakaoMap07 from "../../components/common/KakaoMap07";
import TagBox from "../../components/ohsulTag/TagBox";
import { SearchResult } from "../../types/Map";
import CardColReview from "../../components/common/CardColReview";
import { TagsState, SetTagsFunction } from "../../types/OhsulTag";
import axios from "axios";

interface BarDataTypes {
  barName: string;
  roadAddress: string;
  telephone: string;
  content?: string;
}

const DUMMYPlace = [
  {
    barId: 2,
    barName: "언더그라운드",
    content: "alcoholTags [1,2,3] moodTags[1] musicTags[3] ",
    score: 4,
    barImg:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
    alcoholTags: [1, 2, 3],
    moodTags: [1],
    musicTags: [3],
  },
  {
    barId: 3,
    barName: "와인집",
    content: "alcoholTags [3,6] moodTags[3] musicTags[1]",
    score: 3,
    barImg:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
    alcoholTags: [3, 6],
    moodTags: [3],
    musicTags: [1],
  },
  {
    barId: 5,
    barName: "룸술집",
    content: "alcoholTags [4] moodTags[4] musicTags[2]",
    score: 1,
    barImg:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
    alcoholTags: [4],
    moodTags: [4],
    musicTags: [2],
  },
];

interface BarInfoType extends BarDataTypes {
  alcoholTags: number[];
  moodTags: number[];
  musicTags: number[];
  barId: number;
  barImg: string;
  barAvgScore?: number;
}

const SearchAlcoholPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // 태그박스 사용 시 필요 state
  const [tags, setTags]: [TagsState, SetTagsFunction] = useState<TagsState>({
    alcoholTags: [],
    musicTags: [],
    moodTags: [],
  });

  console.log("checked tag: ", tags);

  // 필터링된 바 목록을 저장할 상태 추가
  const [barInfo, setBarInfo] = useState<BarInfoType[]>([]);

  const filterBarsByTags = () => {
    return barInfo.filter((place: any): place is BarInfoType => {
      // place가 BarInfoType 인터페이스를 만족하는지 여부에 따라 필터링 로직을 적용
      return (
        "alcoholTags" in place &&
        "moodTags" in place &&
        "musicTags" in place &&
        (tags.alcoholTags.length === 0 ||
          tags.alcoholTags.every((tag) => place.alcoholTags.includes(tag))) &&
        (tags.musicTags.length === 0 ||
          tags.musicTags.every((tag) => place.musicTags.includes(tag))) &&
        (tags.moodTags.length === 0 ||
          tags.moodTags.every((tag) => place.moodTags.includes(tag)))
      );
    });
  };

  const [filteredBars, setFilteredBars] = useState(barInfo);
  useEffect(() => {
    const filtered = filterBarsByTags();
    setFilteredBars(filtered);
  }, [tags]);

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

  const handleBarPhone = (phone: string) => {
    return phone.replace(/-/g, "");
  };

  return (
    <>
      <SearchAlcoholPageLayout>
        <Header title="오늘의 술 찾기" />
        <KakaoMap07 onSearchResults={handleSearchResults} />
        <TagBox tags={tags} setTags={setTags} />
        {/* dot Img */}
        <img src="/assets/images/border_dot.png" alt="border_dot" />

        {filteredBars.length > 0 ? (
          <>
            {filteredBars.map((result, index) => (
              <CardColReview
                barId={result.barId}
                barName={result.barName}
                score={result.barAvgScore}
                barImg={result.barImg}
                key={index}
                // @ts-ignore
                content={result.barRecentReviews[0].content}
              />
            ))}
          </>
        ) : (
          <>
            {/* {DUMMYPlace.map((result, index) => (
            <CardColReview
              barId={result.barId}
              barName={result.barName}
              key={index}
              content={result.content}
            />
          ))} */}

            {barInfo.map((result, index) => (
              <CardColReview
                barImg={result.barImg}
                barId={result.barId}
                barName={result.barName}
                score={result.barAvgScore}
                key={index}
                // @ts-ignore
                content={result.barRecentReviews[0].content}
              />
            ))}
          </>
        )}
      </SearchAlcoholPageLayout>
    </>
  );
};

const SearchAlcoholPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;
export default SearchAlcoholPage;
