import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import useAuthStore from "../../stores/useAuthStore";
import SlickSlider from "../../components/common/SlickSlider";
import SlickSliderTag from "../../components/common/SlickSliderTag";
import MainTitleList from "../../components/common/MainTitleList";

import axios from "axios";
interface Bar {
  barId: number;
  barName: string;
  barImg: string;
  alcoholTags: Array<number>;
  musicTags: Array<number>;
  moodTags: Array<number>;
}

interface BarData {
  bars: Bar[];
}
interface RanBarTypes {
  barId: number;
  barName: string;
  barImg: string;
  alcoholTags: string[];
  moodTags: string[];
  musicTags: string[];
}

const MainPage: React.FC = () => {
  useEffect(() => {
    getMainBar();
  }, []);
  const [hipSul, setHipsul] = useState([]);
  const [nearSul, setNearSul] = useState([]);
  const [mySul, setMySul] = useState([]);

  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const getMainBar = async () => {
    try {
      const ranBar = await axios.get("/api/main/용산구");
      const hotBar = await axios.get("/api/main/hotBar");
      if (isLoggedIn == true) {
        const favoriteBar = await axios.get("/api/mypage/favorite");
        console.log("favoriteBar🥲🥲🥲", favoriteBar.data);
        setMySul(favoriteBar.data.favorites);
        console.log("res mySul🥲🥲🥲", mySul);
      }
      setHipsul(ranBar.data);
      console.log("res bar", hipSul);
      setNearSul(hotBar.data);
      console.log("res hotBar", nearSul);
    } catch (error) {
      console.log("getMain err", error);
    }
  };

  console.log(
    "zustand MainPage isLoggedIn:",
    useAuthStore.getState().isLoggedIn
  );

  const iconLocation = "/assets/images/main_location.png";
  const iconHot = "/assets/images/main_hot.png";
  const iconPick = "/assets/images/main_pick.png";

  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <MainTitleList title="내 근처 힙한 술집" icon={iconLocation} />
      {/* @ts-ignore */}
      <SlickSlider bars={hipSul} />
      <MainTitleList title="지금 핫한 술집" icon={iconHot} />
      {/* @ts-ignore */}
      <SlickSlider bars={nearSul} />
      <MainTitleList title="내가 저장한 술집" icon={iconPick} />
      {/* @ts-ignore */}
      <SlickSliderTag bars={mySul} />
    </>
  );
};

export default MainPage;
