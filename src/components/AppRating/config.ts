export const ratingSubTitle = (count: number = 0) => {
  return count && count > 1 ? "stars" : count === 1 ? "star" : "rate now";
};
