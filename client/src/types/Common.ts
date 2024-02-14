export type HeaderTitle = {
  title: string;
};

export type StarRatingProps = {
  score: number;
};

type Tag = {
  [key: string]: string[];
};

export type Card = {
  barName: string;
  tag?: Tag;
  barImg: string;
  score?: number;
  content?: string;
};
