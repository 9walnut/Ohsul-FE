import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

// 상태 타입 및 마커 타입 정의
interface State {
  center: {
    lat: number;
    lng: number;
  } | null;
  errMsg: string | null;
  isLoading: boolean;
}

interface MarkerInfo {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const KakaoMap04 = () => {
  const [info, setInfo] = useState<MarkerInfo | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [state, setState] = useState<State>({
    center: null,
    errMsg: null,
    isLoading: true,
  });

  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 검색할 카테고리 목록
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

  const handleSearch = () => {
    if (!map || !searchWord) return;
    const ps = new kakao.maps.services.Places();
    let totalMarkers: MarkerInfo[] = []; // totalMarkers의 타입을 MarkerInfo[]로 명시

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

          newMarkers.forEach((marker) => {
            totalMarkers.push(marker);
            bounds.extend(
              new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
            );
          });

          if (index === categories.length - 1) {
            // 마지막 카테고리 검색이 완료된 경우
            setMarkers(totalMarkers);
            map.setBounds(bounds);
          }
        }
      });
    });
  };

  // 내 위치 로딩
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
        errMsg: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
    }
  }, []);

  // 내 위치로 이동
  const moveToCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setCenter(new kakao.maps.LatLng(lat, lng));
        },
        (error) => {
          console.error("Geolocation failed: ", error);
        }
      );
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  };

  return (
    <>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : state.center ? (
        <Map
          center={state.center}
          style={{ width: "100%", height: "450px" }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker, index) => (
            <MapMarker
              key={`marker-${index}`}
              position={marker.position}
              // onClick 전화번호를 보내고 일치하는 술집 데이터를 받아오는 axios 요청 추가
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <InfoBox>{marker.content}</InfoBox>
              )}
            </MapMarker>
          ))}
        </Map>
      ) : (
        <p>{state.errMsg || "위치 정보를 가져올 수 없습니다."}</p>
      )}
      <div>
        <button onClick={moveToCurrentLocation}>내 위치로</button>
      </div>
      <br />
      <div>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
    </>
  );
};

const InfoBox = styled.div`
  padding: 4px;
`;

export default KakaoMap04;
