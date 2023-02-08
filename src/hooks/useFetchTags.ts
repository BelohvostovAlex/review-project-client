import { useCallback, useEffect, useState } from "react";

import { tagServiceGetAllTags } from "../services/tagService/tagService";

import { ITag } from "../models/ITag";

interface useFetchOutPut {
  tags: ITag[];
  handleAddTag: (item: ITag) => void;
  handlePage: () => void;
  total: number;
}

export const useFetchTags = (getAll: boolean = true): useFetchOutPut => {
  const [items, setItems] = useState<ITag[]>([]);
  const [page, setPage] = useState<number>(getAll ? 0 : 1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(getAll ? 0 : 8);

  const fetchItems = useCallback(async () => {
    const { data } = await tagServiceGetAllTags(page, limit);

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
  }, [limit, page]);

  useEffect(() => {
    fetchItems();
  }, [page, fetchItems]);

  const handleAddTag = async (value: ITag) => {
    setItems((prev) => [...prev, value]);
  };

  const handlePage = () => {
    setPage((prev) => prev + 1);
  };

  return { tags: items, handleAddTag, handlePage, total };
};
