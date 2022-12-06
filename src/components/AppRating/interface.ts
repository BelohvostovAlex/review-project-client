export enum AppRatingSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export interface AppRatingProps {
  defaultValue?: number;
  max?: number;
  onChange: (rate: number) => void;
  rating: number | null;
  size?: AppRatingSize;
}
