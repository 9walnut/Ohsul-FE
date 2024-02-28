export type HeaderTitle = {
  title: string;
};
export type MainTitle = {
  title: string;
  icon: string;
};

export type Tag = {
  [key: string]: number[];
};

//공통 카드 컴포넌트
export type Card = {
  barName: string;
  barPhone?: string;
  tag?: Tag;
  barImg?: string;
  score?: number;
  content?: string;
  barId?: number | string;
};

//카드 컴포넌트 태그타입
export type CardTag = Omit<Card, "content">;
//카드 컴포넌트 리뷰타입
export type CardReview = Omit<Card, "tag">;

//술집리뷰페이지 리뷰카드
export type CardBarReview = {
  barName?: string;
  userNickname?: string;
  nickname?: string;
  avgScore?: number;
  score?: number;
  reviewImg?: string;
  tag?: Tag;
  content?: string;
  date: string;
  barId: number;
  reviewId: number;
  alcoholTags?: number[];
  moodTags?: number[];
  musicTags?: number[];
};

export type Modal = {
  message: string | React.ReactNode;
  isClose: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export type getBarInfo = {
  barId: number | string;
  barImg: string;
  barName: string;
  name: string;
  phone: string;
  alcoholTags?: number[];
  moodTags?: number[];
  musicTags?: number[];
};

export type FavoriteBar = {
  avgScore?: number;
  barName: string;
  barPhone?: string;
  tag?: Tag;
  barImg?: string;
  score?: number;
  content?: string;
  barId?: number;
  alcoholTags?: number[];
  moodTags?: number[];
  musicTags?: number[];
  barAvgScore?: number;
  onFavoriteChange?: () => void;
};
