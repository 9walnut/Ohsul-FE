import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = styled.div`
  width: 80%;
  height: 700px;
  margin: 20px;
`;

const KakaoMap03 = () => {
  const [map, setMap] = useState<any>(null);
  const [centerRegion, setCenterRegion] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [moveKeyword, setMoveKeyword] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          37.53005069999996,
          126.96089345393857
        ),
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(mapContainer, options);
      setMap(newMap);

      const ps = new window.kakao.maps.services.Places(newMap);

      const displayCenterInfo = (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const infoDiv = document.getElementById("centerAddr");
          if (infoDiv) {
            infoDiv.innerHTML = result[0].address_name;

            const updatedCenterRegion = result[0].address_name;
            setCenterRegion(updatedCenterRegion);

            console.log("Region: ", updatedCenterRegion);
            setMoveKeyword(`${result[0].region_3depth_name}`);
          }
        }
      };

      const geocoder = new window.kakao.maps.services.Geocoder();

      const searchAddrFromCoords = (coords: any, callback: any) => {
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      };

      searchAddrFromCoords(newMap.getCenter(), displayCenterInfo);

      window.kakao.maps.event.addListener(newMap, "idle", () => {
        searchAddrFromCoords(newMap.getCenter(), displayCenterInfo);
      });
    };

    initializeMap();
  }, []);

  useEffect(() => {
    handleMoveSearch();
    console.log("moveKeyword", moveKeyword);
  }, [moveKeyword]);

  const handleMoveSearch = () => {
    if (map && moveKeyword) {
      const searchCategories = [
        "술집",
        "호프",
        "요리주점",
        "포장마차",
        "오뎅바",
        "와인바",
        "일본식주점",
        "칵테일바",
      ];

      searchPlacesByCategory(moveKeyword, searchCategories);
    }
  };

  const handleSearch = () => {
    if (map && keyword) {
      const searchCategories = [
        "술집",
        "호프",
        "요리주점",
        "포장마차",
        "오뎅바",
        "와인바",
        "일본식주점",
        "칵테일바",
      ];

      searchPlacesByCategory(keyword, searchCategories);
    }
  };

  const searchPlacesByCategory = (
    baseKeyword: string,
    categories: string[]
  ) => {
    const ps = new window.kakao.maps.services.Places(map);

    removeAllMarkers();
    removeInfoWindow();

    const bounds = new window.kakao.maps.LatLngBounds();

    categories.forEach((category) => {
      const fullKeyword = `${baseKeyword} ${category}`;
      ps.keywordSearch(fullKeyword, placesSearchCB);
      console.log(fullKeyword);
    });

    function placesSearchCB(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        data.forEach((place: any) => {
          displayMarker(map, place);
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        map.setBounds(bounds);
      }
    }

    function displayMarker(map: any, place: any) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);

      window.kakao.maps.event.addListener(marker, "click", () => {
        removeInfoWindow();

        const infowindow = new window.kakao.maps.InfoWindow({
          zIndex: 1,
        });

        setInfoWindow(infowindow);

        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        );
        infowindow.setPosition(new window.kakao.maps.LatLng(place.y, place.x));

        infowindow.open(map);
      });
    }
  };

  const removeAllMarkers = () => {
    markers.forEach((marker: any) => {
      marker.setMap(null);
    });

    setMarkers([]);
  };

  const removeInfoWindow = () => {
    if (infoWindow) {
      infoWindow.close();
      setInfoWindow(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <span>지도중심기준 행정동 주소정보: </span>
      <span id="centerAddr"></span>
      <Map id="map" />
      <div>
        <input
          type="text"
          id="searchInput"
          placeholder="장소를 검색하세요"
          value={keyword}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
    </>
  );
};

export default KakaoMap03;
