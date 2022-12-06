const reviewCategories = ["games", "movies", "books"];

export const categoryOptions = reviewCategories.map((option) => {
  const firstLetter = option[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
    title: option,
  };
});
