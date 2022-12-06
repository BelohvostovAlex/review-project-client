export const chooseRegisterTextField = (item: string) => {
  return item === "artItem" ? "artItem" : "tags";
};
export const choosePlaceholder = (item: string) => {
  return item === "artItem"
    ? "As for me Harry Potter is amazing movie, because..."
    : "Cool, Superb, Awesome, Low, Funny";
};
