export type HeaderTitle = {
  title: string;
};

//오술태그 타입
type Tag = {
  [key: string]: string[];
};

//공통 카드 컴포넌트
export type Card = {
  barName: string;
  tag?: Tag;
  barImg?: string;
  score?: number;
  content?: string;
};

//카드 컴포넌트 태그타입
export type CardTag = Omit<Card, "content">;
//카드 컴포넌트 리뷰타입
export type CardReview = Omit<Card, "tag">;

//술집리뷰페이지 리뷰카드
export type CardBarReview = {
  userNickname: string;
  score: number;
  barImg?: string;
  tag?: Tag;
  content?: string;
  date: string;
};
