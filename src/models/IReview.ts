export interface IReview {
  _id: string;
  creator: string;
  title: string;
  artItem: string;
  text: string;
  category: string;
  tags: string[];
  grade: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
