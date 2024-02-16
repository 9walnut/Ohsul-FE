import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { State, MarkerInfo, SearchResult, SearchCenter } from "../../types/Map";

const KakaoMap05 = () => {
  const [info, setInfo] = useState<MarkerInfo | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [state, setState] = useState<State>({
    center: null,
    errMsg: null,
    isLoading: true,
  });

  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<SearchCenter | null>(null);

  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const [moveKeyword, setMoveKeyword] = useState<string>("");

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
            //map.setBounds(bounds);
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

  return (
    <>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : state.center ? (
        <>
          <Map
            center={state.center}
            style={{ width: "100%", height: "450px" }}
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
            {markers.map((marker, index) => (
              <MapMarker
                key={`marker-${index}`}
                position={marker.position}
                onClick={() => setInfo(marker)}
              >
                {info && info.content === marker.content && (
                  <InfoBox>{marker.content}</InfoBox>
                )}
              </MapMarker>
            ))}
          </Map>
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
          <div>
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <SearchResultsList results={searchResults} />
        </>
      ) : (
        <p>{state.errMsg || "위치 정보를 가져올 수 없습니다."}</p>
      )}
      <div>
        <button onClick={handleMyLocation}>내 위치</button>
      </div>
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

export default KakaoMap05;
