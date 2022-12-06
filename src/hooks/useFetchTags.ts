import { useEffect, useState } from "react";

import { tagServiceGetAllTags } from "../services/tagService/tagService";
import { ITag } from "../models/ITag";

export const useFetchItems = (): [ITag[], (item: ITag) => void] => {
  const [items, setItems] = useState<ITag[]>([]);

  const fetchItems = async () => {
    const response = await tagServiceGetAllTags();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (value: ITag) => {
    setItems((prev) => [...prev, value]);
  };

  return [items, handleAddItem];
};
