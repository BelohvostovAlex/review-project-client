import { useEffect, useState } from "react";

import { tagServiceGetAllTags } from "../services/tagService/tagService";
import { ITag } from "../models/ITag";

interface useFetchOutPut {
  tags: ITag[];
  handleAddTag: (item: ITag) => void;
  handlePage: () => void;
}

export const useFetchTags = (getAll: boolean = true): useFetchOutPut => {
  const [items, setItems] = useState<ITag[]>([]);
  const [page, setPage] = useState<number>(getAll ? 0 : 1);
  const [total, setTotal] = useState<number>();
  const [limit, setLimit] = useState<number>(getAll ? 0 : 4);

  const fetchItems = async () => {
    const { data } = await tagServiceGetAllTags(page, limit);
    console.log(data);
    if (data) {
      setLimit(data.limit);
      setPage(data.page);
      setTotal(data.total);
      if (page > 1) {
        setItems((prev) => [...prev, ...data.tags]);
      } else {
        setItems(data.tags);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  const handleAddTag = async (value: ITag) => {
    setItems((prev) => [...prev, value]);
  };

  const handlePage = () => {
    setPage((prev) => prev + 1);
  };

  return { tags: items, handleAddTag, handlePage };
};
