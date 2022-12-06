import { useEffect, useState } from "react";

import { IArtItem } from "../models/IArtItem";
import { artItemsServiceGetAllItems } from "../services/artItemsService/artItemsService";

export const useFetchArtItems = (): [IArtItem[], (item: IArtItem) => void] => {
  const [items, setItems] = useState<IArtItem[]>([]);

  const fetchItems = async () => {
    const response = await artItemsServiceGetAllItems();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (value: IArtItem) => {
    setItems((prev) => [...prev, value]);
  };

  return [items, handleAddItem];
};
