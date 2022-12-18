import { useMemo } from "react";

export const useMarkdownOptions = () => {
  return useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      variant: "standart",
      status: false,
      maxHeight: "200px",
      uploadImage: false,
      placeholder: "As for me Harry Potter is a great movie, because...",
    }),
    []
  );
};
