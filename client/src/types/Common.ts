export type HeaderTitle = {
  title: string;
};

export type Tag = {
  [key: string]: string[];
};

//공통 카드 컴포넌트
export type Card = {
  barName: string;
  barPhone?: string;
  tag?: Tag;
  barImg?: string;
  score?: number;
  content?: string;
  barId?: number;
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

export type Modal = {
  message: string | React.ReactNode;
  isClose: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
};
