import { IReview } from "../models/IReview";

export const handleLike = (
  initialArr: IReview[],
  id: string,
  userId: string
) => {
  return initialArr.map((item) =>
    item._id === id && item.likes.includes(userId)
      ? { ...item, likes: item.likes.filter((item) => item !== userId) }
      : item._id === id && !item.likes.includes(userId)
      ? { ...item, likes: [...item.likes, userId] }
      : item
  );
};
