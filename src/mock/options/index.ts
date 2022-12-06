import { ICategory } from "../../models/ICategory";

export const handleCategoryOptions = (options: ICategory[]) => {
  return options.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      title: option.title,
    };
  });
};
