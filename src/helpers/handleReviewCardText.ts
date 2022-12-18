export const handleReviewCardText = (text: string, limit: number): string => {
  return text.length < limit ? text : text.slice(0, limit) + "...";
};
