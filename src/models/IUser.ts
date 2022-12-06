export interface IUser {
  id: string;
  username: string;
  email: string;
  role: number;
  lastEnter: string;
  createdReviews: string[];
  likedReviews: string[];
  ratedArtItems: string[];
}
