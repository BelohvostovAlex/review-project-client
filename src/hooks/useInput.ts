import { useState } from "react";

type UseInput = [
  string,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  () => void
];

export const useInput = (initialValue: string): UseInput => {
  const [value, setValue] = useState(initialValue);

  const handleValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setValue(value);
  };

  const clearValue = () => {
    setValue("");
  };

  return [value, handleValue, clearValue];
};
