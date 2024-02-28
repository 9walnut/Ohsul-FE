import { useCallback } from "react";

export const useAlcoholTags = () => {
  const getAlcoholTagName = useCallback((id: number): string => {
    switch (id) {
      case 1:
        return "소주 / 맥주";
      case 2:
        return "해외 맥주 / 생맥주";
      case 3:
        return "칵테일";
      case 4:
        return "막걸리 / 전통주";
      case 5:
        return "와인";
      case 6:
        return "양주";
      case 7:
        return "고량주";
      case 8:
        return "사케 / 하이볼";
      case 9:
        return "이색 술";
      default:
        return "알 수 없는 태그";
    }
  }, []);

  return getAlcoholTagName;
};

export const useMusicTags = () => {
  const getMusicTagName = useCallback((id: number): string => {
    switch (id) {
      case 1:
        return "댄스 / 아이돌";
      case 2:
        return "발라드 / R&B";
      case 3:
        return "힙합";
      case 4:
        return "EDM";
      case 5:
        return "재즈 / 클래식";
      case 6:
        return "7080 / 올드팝";
      case 7:
        return "그때그때 달라요";
      default:
        return "알 수 없는 태그";
    }
  }, []);

  return getMusicTagName;
};

export const useMoodTags = () => {
  const getMoodTagName = useCallback((id: number): string => {
    switch (id) {
      case 1:
        return "혼술 가능한";
      case 2:
        return "이야기 나누기 적당한";
      case 3:
        return "프라이빗한";
      case 4:
        return "다같이 즐기는";
      case 5:
        return "감성적인";
      case 6:
        return "힙한";
      default:
        return "알 수 없는 태그";
    }
  }, []);

  return getMoodTagName;
};
