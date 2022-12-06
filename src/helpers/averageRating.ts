import { IRating } from "../models/IRating";

export const averageRating = (items: IRating[]) => {
  const rateSum = items.reduce((acc, curr) => acc + curr.rate, 0);
  return (rateSum / items.length).toFixed(2);
};
