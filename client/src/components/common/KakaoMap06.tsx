import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { State, MarkerInfo, SearchResult, SearchCenter } from "../../types/Map";
import MapToggle from "./MapToggle";

const KakaoMap06 = () => {
  const [info, setInfo] = useState<MarkerInfo | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [state, setState] = useState<State>({
    center: null,
    errMsg: null,
    isLoading: true,
  });
  const [isOff, setIsOff] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<SearchCenter | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [moveKeyword, setMoveKeyword] = useState<string>("");
  const [clickedResult, setClickedResult] = useState<SearchResult | null>(null);
  const [getInfo, setGetInfo] = useState("");
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

  // 검색 버튼 클릭
  const handleSearch = () => {
    if (!map || !searchWord) return;
    map.setLevel(3);
    const ps = new kakao.maps.services.Places();
    let totalMarkers: MarkerInfo[] = [];
    let totalResults: SearchResult[] = [];

    categories.forEach((category, index) => {
      const searchQuery = `${searchWord} ${category}`;

      ps.keywordSearch(searchQuery, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const newMarkers: MarkerInfo[] = data.map((item) => ({
            position: {
              lat: parseFloat(item.y),
              lng: parseFloat(item.x),
            },
            content: item.place_name,
          }));

          const newResults: SearchResult[] = data.map((item) => ({
            name: item.place_name,
            address: item.address_name,
            lat: parseFloat(item.y),
            lng: parseFloat(item.x),
            phone: item.phone,
          }));

          newMarkers.forEach((marker) => {
            totalMarkers.push(marker);
            bounds.extend(
              new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
            );
          });

          totalResults = [...totalResults, ...newResults];

          if (index === categories.length - 1) {
            setMarkers(totalMarkers);
            setSearchResults(totalResults);
            map.setBounds(bounds);
          }
        }
      });
    });
    setSearchWord("");
  };

  // 지도 이동 시 검색
  const handleMovedSearch = () => {
    if (!map || !moveKeyword) return;
    //if (!map || !moveKeyword || prevMoveKeyWord.current === moveKeyword) return;

    const ps = new kakao.maps.services.Places();
    let totalMarkers: MarkerInfo[] = [];
    let totalResults: SearchResult[] = [];
    map.setLevel(3);
    categories.forEach((category, index) => {
      const searchQuery = `${moveKeyword} ${category}`;

      ps.keywordSearch(searchQuery, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          //const bounds = new kakao.maps.LatLngBounds();
          const newMarkers: MarkerInfo[] = data.map((item) => ({
            position: {
              lat: parseFloat(item.y),
              lng: parseFloat(item.x),
            },
            content: item.place_name,
          }));

          const newResults: SearchResult[] = data.map((item) => ({
            name: item.place_name,
            address: item.address_name,
            lat: parseFloat(item.y),
            lng: parseFloat(item.x),
            phone: item.phone,
          }));

          newMarkers.forEach((marker) => {
            totalMarkers.push(marker);
            //bounds.extend(
            //new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
            //);
          });

          totalResults = [...totalResults, ...newResults];

          if (index === categories.length - 1) {
            setMarkers(totalMarkers);
            setSearchResults(totalResults);
            // map.setBounds(bounds);
          }
        }
      });
    });
  };

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

  // 좌표를 주소로 변환
  const convertCoordsToAddress = (x: number, y: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(y, x);
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
        setMoveKeyword(result[0].address.region_2depth_name);
      } else {
        setAddress("주소 변환에 실패했습니다.");
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  // 마커 클릭 시 정보 설정
  const handleMarkerClick = (markerInfo: MarkerInfo) => {
    const result = searchResults.find(
      (result) => result.name === markerInfo.content
    );
    if (result) {
      setClickedResult(result);
    } else {
      setClickedResult(null);
    }
    setInfo(markerInfo);
  };

  return (
    <>
      <SearchWrapper>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="지역 또는 매장명으로 찾기"
        />
        <button onClick={handleSearch}>
          <img src="/assets/images/map_search.png" alt="search" />
        </button>
      </SearchWrapper>

      {state.isLoading ? (
        <p>Loading...</p>
      ) : state.center ? (
        <>
          <MapWrapper>
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

                handleMovedSearch();
              }}
            >
              {/* <MapToggle /> */}
              <SearchBtn onClick={handleMyLocation}>
                <img src="/assets/images/map_myloc.png" alt="myLoc" />내 위치
              </SearchBtn>

              {markers.map((marker, index) => (
                <MapMarker
                  key={`marker-${index}`}
                  position={marker.position}
                  // onClick={() => setInfo(marker)}
                  onClick={() => handleMarkerClick(marker)}
                  // image={{
                  //   src: `${process.env.PUBLIC_URL}/assets/images/map_pin.png`,
                  //   size: {
                  //     width: 15,
                  //     height: 19,
                  //   },
                  // }}
                >
                  {info && info.content === marker.content && (
                    <InfoBox>{marker.content}</InfoBox>
                  )}
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
      {data && (
        <>
          <div>
            <p>✅ 지도 이동 시: </p>
            <p>
              위도 {data.position.lat}
              <br /> 경도 {data.position.lng}
            </p>
            <br />
            <p>✅ 현재 주소: {address}</p>
          </div>
        </>
      )}
      {clickedResult && (
        <DetailBox>
          <img
            src={
              process.env.PUBLIC_URL + "assets/images/common_alternateImage.png"
            }
            alt="리뷰이미지"
            width="100px"
          />
          <br />
          <p>{clickedResult.name}</p>
          <br />
          {clickedResult.address}
          <br />
          {clickedResult.phone
            ? clickedResult.phone
            : "연락처 정보가 없습니다."}
        </DetailBox>
      )}
      <h2>😀 술집 리스트 😀</h2>
      <br />
      <SearchResultsList results={searchResults} />
    </>
  );
};

const InfoBox = styled.div`
  padding: 4px;
`;

const SearchResultsList: React.FC<{ results: SearchResult[] }> = ({
  results,
}) => (
  <>
    <ul>
      {results.map((result, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
          <strong>{result.name}</strong>
          <br />
          {result.address}
          <br />
          {result.phone}
        </li>
      ))}
    </ul>
  </>
);

const DetailBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: #beae95;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBtn = styled.button`
  position: absolute;
  width: 90px;
  display: flex;
  justify-content: space-around;
  bottom: 10px;
  right: 40%;
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
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  input {
    width: 240px;
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

export default KakaoMap06;
