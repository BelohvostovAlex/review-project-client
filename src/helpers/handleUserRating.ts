import { IRating } from "../models/IRating";

export const handleUserRating = (items: IRating[], id: string): number => {
  return items.findIndex((item) => item.user.id === id);
};
