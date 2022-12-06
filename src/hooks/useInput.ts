import { useState } from "react";

type UseInput = [
  string | number,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void
];

export const useInput = (initialValue: string | number): UseInput => {
  const [value, setValue] = useState(initialValue);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValue = () => {
    setValue("");
  };

  return [value, handleValue, clearValue];
};
