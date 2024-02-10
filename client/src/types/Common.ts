export type HeaderTitle = {
  title: string;
};

type Tag = {
  [key: string]: string[];
};

export type Card = {
  barName: string;
  tag?: Tag;
  barImg?: string;
  score?: number;
  content?: string;
};

export type CardTag = Omit<Card, "content">;
export type CardReview = Omit<Card, "tag">;
