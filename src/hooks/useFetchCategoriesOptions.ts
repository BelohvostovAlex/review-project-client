import { useState, useEffect } from "react";
import { handleCategoryOptions } from "../mock/options";

import { categoryServiceGetAllCategories } from "../services/categoryService/categoryService";

interface CategoryOptionsState {
  firstLetter: string;
  title: string;
}

export const useFetchCategoriesOptions = () => {
  const [categories, setCategories] = useState([] as CategoryOptionsState[]);

  const getCategories = async () => {
    const { data } = await categoryServiceGetAllCategories();
    const categoryOptions = handleCategoryOptions(data);
    setCategories(categoryOptions);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};
