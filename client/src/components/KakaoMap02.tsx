import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}
const Map2 = styled.div`
  width: 80%;
  height: 700px;
  margin: 20px;
`;

const KakaoMap02 = () => {
  // 지도 이동에 따라 추출되는 주소 값 저장
  const [centerRegion, setCenterRegion] = React.useState<string | null>(null);

  //-----------------------------------------기본 지도 생성
  useEffect(() => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    const infowindow2 = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const container2 = document.getElementById("map2"); // 지도를 표시할 div
    const option2 = {
      center: new window.kakao.maps.LatLng(
        37.53005069999996,
        126.96089345393857
      ), // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성
    const map2 = new window.kakao.maps.Map(container2, option2);

    // 주소-좌표 변환 객체를 생성합니다 **
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다**
    searchAddrFromCoords(map2.getCenter(), displayCenterInfo);

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다**
    window.kakao.maps.event.addListener(map2, "idle", function () {
      searchAddrFromCoords(map2.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords: any, callback: any) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다**
    function displayCenterInfo(result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const infoDiv = document.getElementById("centerAddr");
        if (infoDiv !== null) {
          infoDiv.innerHTML = result[0].address_name;
          // 2depth, 3depth
          const region2depth = result[0].region_2depth_name;
          const region3depth = result[0].region_3depth_name;

          console.log(region2depth);
          console.log(region3depth); //얘는 되는데 세터함수 변경이 안되고있따. 지도 바뀔때ㅏ다

          // setCenterRegion를 호출한 후에 주소 정보를 업데이트합니다.
          const updatedCenterRegion = `${region2depth} ${region3depth}`;
          // 상태 업데이트는 여기서 한 번만 실행됩니다.
          if (updatedCenterRegion !== centerRegion) {
            setCenterRegion(updatedCenterRegion);
          }
          // setCenterRegion를 호출한 후에 주소 정보를 업데이트합니다.
          // setCenterRegion(`${region2depth} ${region3depth}`);
          // console.log("centerRegion", centerRegion);
        }
        // for (let i = 0; i < result.length; i++) {
        //   infoDiv.innerHTML = result[i].address_name;
        // }
      }

      // console.log("주소 정보 result: ", result[0]);
      // console.log("주소: ", result[0].address_name);
      // console.log("2depth: ", result[0].region_2depth_name);
      // console.log("3depth: ", result[0].region_3depth_name);
    }

    //-----------------------------------------키워드로 장소 검색하기

    // 장소 검색 객체를 생성
    const ps2 = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색
    ps2.keywordSearch("종로 이자카야", placesSearchCB);
    ps2.keywordSearch("종로 일본식주점", placesSearchCB);
    ps2.keywordSearch("종로 칵테일", placesSearchCB);

    // if (centerRegion) {
    //   const ps2 = new window.kakao.maps.services.Places();
    //   ps2.keywordSearch(`${centerRegion} 이자카야 `, placesSearchCB);
    //   ps2.keywordSearch(`${centerRegion} 일본식주점 `, placesSearchCB);
    //   ps2.keywordSearch(`${centerRegion} 칵테일 `, placesSearchCB);
    // }
    // ps2.keywordSearch(`${centerRegion} 이자카야 `, placesSearchCB);
    // ps2.keywordSearch(`${centerRegion} 일본식주점 `, placesSearchCB);
    // ps2.keywordSearch(`${centerRegion} 칵테일 `, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map2.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: map2,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow2.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow2.open(map2, marker);
      });
    }
  }, []);
  useEffect(() => {
    console.log("centerRegion", centerRegion);

    // if(centerRegion) {
    //   const ps2 = new window.kakao.maps.services.Places();

    //   ps2.keywordSearch(`${centerRegion} 이자카야`, placesSearchCB);
    //   ps2.keywordSearch(`${centerRegion} 일본식주점`, placesSearchCB);
    //   ps2.keywordSearch(`${centerRegion} 칵테일`, placesSearchCB);
    // }
    // ps2.keywordSearch(`${centerRegion} 이자카야 `, placesSearchCB);
    // ps2.keywordSearch(`${centerRegion} 일본식주점 `, placesSearchCB);
    // ps2.keywordSearch(`${centerRegion} 칵테일 `, placesSearchCB);
  }, [centerRegion]);

  return (
    <>
      <h3>KakaoMap02 - 업종에 맞춰 가져오기 (술집)</h3>
      <p>이동할때마다 확인되는 주소지 확인, 주소기 기반으로 재검색 되도록</p>
      <div className="hAddr">
        <h5 className="title">지도중심기준 주소정보: </h5>
        <h5 id="centerAddr"></h5>
      </div>
      <Map2 id="map2" />
    </>
  );
};
export default KakaoMap02;
