import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { State, MarkerInfo, SearchResult, SearchCenter } from "../../types/Map";
import MapToggle from "./MapToggle";
import CardColTag from "./CardColTag";
import MapLoading from "./MapLoading";
import axios from "axios";
import { FavoriteBar } from "../../types/Common";

interface SelectOptionsTypes {
  value: string;
  label: string;
}

interface BarDataTypes {
  barName: string;
  roadAddress: string;
  telephone: string;
}

const SelectOptions: SelectOptionsTypes[] = [
  { value: "local", label: "지역명" },
  { value: "store", label: "매장명" },
];

const KakaoMap08 = ({
  onSearchResults,
}: {
  onSearchResults: (results: SearchResult[]) => void;
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c4a8fe0afcb6e392c9cd360155098ed5&libraries=services,clusterer`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [selectedValue, setSelectedValue] = useState<string>(
    SelectOptions[0].value
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  const [info, setInfo] = useState<MarkerInfo | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeOverlay, setActiveOverlay] =
    useState<kakao.maps.CustomOverlay | null>(null);
  const [isReSearch, setIsReSearch] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    center: null,
    errMsg: null,
    isLoading: true,
  });
  const [isOff, setIsOff] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<SearchCenter | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [moveKeyword, setMoveKeyword] = useState<string>("");
  const [clickedResult, setClickedResult] = useState<FavoriteBar | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("지역명");

  const categories = [
    "술집",
    "호프",
    "요리주점",
    "포장마차",
    "오뎅바",
    "와인바",
    "일본식주점",
    "칵테일바",
  ];

  //mount 시 내 위치 설정
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState({
            center: newPos,
            errMsg: null,
            isLoading: false,
          });
          // 현재 위치 얻고, 좌표를 주소로 변환,  moveKeyword 설정
          convertCoordsToAddress(newPos.lng, newPos.lat);
        },
        (err) => {
          setState({
            center: null,
            errMsg: err.message,
            isLoading: false,
          });
        }
      );
    } else {
      setState({
        center: null,
        errMsg: "Geolocation err",
        isLoading: false,
      });
    }
  }, []);

  //state.center, map, moveKeyword 가 설정되면 검색 실행
  useEffect(() => {
    if (state.center && map && moveKeyword) {
      handleMovedSearch();
      console.log("🍪handleMovedSearch 실행");
    }
  }, [state.center, map, moveKeyword]);

  //지도 이동 시 현재 위치 설정
  const handleMyLocation = () => {
    if (state.center && map) {
      const { lat, lng } = state.center;
      //지도 레벨 3으로 설정하면서 이동
      map.setLevel(3, {
        anchor: new kakao.maps.LatLng(lat, lng),
      });
      map.setCenter(new kakao.maps.LatLng(lat, lng));
    } else {
      console.error("Map or center is not available.");
    }
  };

  // 지도 이동 시 검색
  const handleMovedSearch = () => {
    if (!map || !moveKeyword) return;

    const ps = new kakao.maps.services.Places();
    // `MarkerInfo[]`와 `SearchResult[]` 타입을 명시적으로 지정
    let totalMarkers: MarkerInfo[] = [];
    let totalResults: SearchResult[] = [];
    map.setLevel(3);
    const bounds = map.getBounds(); // 지도의 현재 경계를 가져옵니다.

    categories.forEach((category, index) => {
      const searchQuery = `${moveKeyword} ${category}`;

      ps.keywordSearch(searchQuery, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 각 배열의 요소 타입을 명시적으로 지정
          const newMarkers: MarkerInfo[] = [];
          const newResults: SearchResult[] = [];

          data.forEach((item) => {
            const latLng = new kakao.maps.LatLng(
              parseFloat(item.y),
              parseFloat(item.x)
            );
            if (bounds.contain(latLng)) {
              // 검색 결과가 지도 경계 내에 있는지 확인
              const markerInfo: MarkerInfo = {
                position: {
                  lat: parseFloat(item.y),
                  lng: parseFloat(item.x),
                },
                content: item.place_name,
              };

              const searchResult: SearchResult = {
                name: item.place_name,
                address: item.address_name,
                lat: parseFloat(item.y),
                lng: parseFloat(item.x),
                phone: item.phone,
              };

              newMarkers.push(markerInfo);
              newResults.push(searchResult);
            }
          });

          totalMarkers = [...totalMarkers, ...newMarkers];
          totalResults = [...totalResults, ...newResults];

          if (index === categories.length - 1) {
            setMarkers(totalMarkers); // 지도 내부에 있는 마커만 업데이트
            setSearchResults(totalResults);
            onSearchResults(totalResults);
          }
        }
      });
    });
  };

  // 좌표를 주소로 변환
  const convertCoordsToAddress = (x: number, y: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(y, x);
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const addressName = result[0].address.address_name;
        setAddress(addressName);
        const regionName = result[0].address.region_2depth_name;
        setMoveKeyword(regionName);
        // setAddress(result[0].address.address_name);
        // setMoveKeyword(result[0].address.region_2depth_name);
      } else {
        setAddress("주소 변환에 실패했습니다.");
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };
  useEffect(() => {
    if (state.center && map && moveKeyword) {
      console.log("🍯 이 지역 재검색 실행:", moveKeyword);
      handleMovedSearch();
    }
  }, [state.center, map, moveKeyword]);

  // 핀 클릭 요청 1개
  const postMarkerInfo = async (barData: BarDataTypes) => {
    try {
      console.log(barData, "postMarker barData!!");
      const res = await axios.post("/api/ohsul/near", [barData], {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("postMarker resdata", res.data);
      setClickedResult(res.data[0]);
    } catch (error) {
      console.log("getMarker err", error);
    }
  };

  // 마커 클릭 시 정보 설정
  const handleMarkerClick = (markerInfo: MarkerInfo) => {
    const result = searchResults.find(
      (result) => result.name === markerInfo.content
    );
    // 가게 상세 정보 요청 추가.....합시...다

    if (result) {
      const barData: BarDataTypes = {
        barName: result.name,
        roadAddress: result.address,
        telephone: result.phone ? result.phone.replace(/-/g, "") : "",
      };

      postMarkerInfo(barData);
      // setClickedResult(result);
    } else {
      setClickedResult(null);
    }

    // 이전에 활성화된 오버레이가 있다면 제거
    if (activeOverlay) {
      activeOverlay.setMap(null);
      setActiveOverlay(null);
    }

    if (result && map) {
      // 커스텀 오버레이에 표시될 내용
      const content = `<div class="custom-overlay">${result.name}</div>`;

      // 새 커스텀 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: new kakao.maps.LatLng(
          markerInfo.position.lat,
          markerInfo.position.lng
        ),
        xAnchor: 0.5,
        yAnchor: 1.4,
      });

      // 지도에 커스텀 오버레이 표시
      overlay.setMap(map);

      // 활성화된 오버레이 상태 업데이트
      setActiveOverlay(overlay);
    }
  };

  const handleDrag = () => {
    setIsReSearch(true);
  };

  return (
    <>
      {state.isLoading ? (
        <MapLoading />
      ) : state.center ? (
        <>
          <MapWrapper>
            {isReSearch && (
              <ReSearchModal
                onClick={() => {
                  setIsReSearch(false);
                  handleMovedSearch();
                }}
              >
                <img src="/assets/images/map_reload.png" />이 지역 재검색
              </ReSearchModal>
            )}
            <Map
              center={state.center}
              style={{ width: "", height: "450px" }}
              level={3}
              onCreate={setMap}
              onCenterChanged={(map) => {
                const latlng = map.getCenter();
                setData({
                  position: {
                    lat: latlng.getLat(),
                    lng: latlng.getLng(),
                  },
                });
                convertCoordsToAddress(latlng.getLng(), latlng.getLat());
              }}
              onDragEnd={(map) => {
                const latlng = map.getCenter();
                const bounds = new kakao.maps.LatLngBounds();
                bounds.extend(latlng);
                map.setLevel(3);
                setData({
                  position: {
                    lat: latlng.getLat(),
                    lng: latlng.getLng(),
                  },
                });
                convertCoordsToAddress(latlng.getLng(), latlng.getLat());
                console.log("onDragEnd", moveKeyword);
                handleDrag();
              }}
            >
              <SearchBtn onClick={handleMyLocation}>
                <img src="/assets/images/map_myloc.png" alt="myLoc" />내 위치
              </SearchBtn>

              {markers.map((marker, index) => (
                <MapMarker
                  key={`marker-${index}`}
                  position={marker.position}
                  // onClick={() => setInfo(marker)}
                  onClick={() => handleMarkerClick(marker)}
                  image={{
                    src: `${process.env.PUBLIC_URL}/assets/images/map_markerPin.png`,
                    size: {
                      width: 45,
                      height: 45,
                    },
                  }}
                >
                  {info && info.content === marker.content && marker.content}
                </MapMarker>
              ))}
              {/* 내 위치 마커*/}
              {state.center && (
                <MapMarker
                  position={state.center}
                  image={{
                    src: `${process.env.PUBLIC_URL}/assets/images/map_mymarker(border-black).png`,
                    size: {
                      width: 44,
                      height: 44,
                    },
                  }}
                />
              )}
            </Map>
          </MapWrapper>
        </>
      ) : (
        <p>{state.errMsg || "위치 정보를 가져올 수 없습니다."}</p>
      )}
      <br />

      {clickedResult && (
        <>
          <CardColTag
            barId={clickedResult.barId}
            barName={clickedResult.barName}
            barImg={clickedResult.barImg}
            alcoholTags={clickedResult.alcoholTags}
            moodTags={clickedResult.moodTags}
            musicTags={clickedResult.musicTags}
            score={clickedResult.barAvgScore}
          />
        </>
      )}
      {data && (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

const ReSearchModal = styled.div`
  cursor: pointer;
  align-items: center;
  position: absolute;
  top: 10px;
  z-index: 4;
  right: 35%;
  width: auto;
  padding: 6px;
  border-radius: 15px;
  border: 1px solid #4d607b;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.darkFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  animation: fadeInDown 0.5s;

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  img {
    width: 12px;
    margin-right: 5px;
  }
`;

const MapWrapper = styled.div`
  /* 커스텀 마커 */
  .custom-overlay {
    font-family: ${({ theme }) => theme.fonts.ydFont};
    padding: 8px 12px;
    background: ${({ theme }) => theme.colors.btnBlue};
    color: ${({ theme }) => theme.colors.lightFont};
    letter-spacing: 1px;
    border: 1px solid #ccc;
    border-radius: 8px;
    position: relative;
    bottom: 34px;
  }
  position: relative;
  width: 100%;
`;

const SearchBtn = styled.button`
  position: absolute;
  width: 90px;
  display: flex;
  justify-content: space-around;
  bottom: 10px;
  right: 35%;
  z-index: 2;
  border: 1px solid #4d607b;
  outline: none;
  border-radius: 15px;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.darkFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  padding: 5px;
  cursor: pointer;
  img {
    width: 14px;
    margin-top: 4px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  input {
    width: 300px;
    padding: 6px 20px;
    border-radius: 100px;
    border: 1px solid #4d607b;
    font-family: ${({ theme }) => theme.fonts.ydFont};
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
  }

  input:focus {
    outline: none;
  }

  button {
    z-index: 10;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    position: absolute;
    right: 4px;
    top: 5px;
  }
`;

export default KakaoMap08;
