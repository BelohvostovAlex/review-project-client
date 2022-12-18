export const chooseRegisterTextField = (item: string) => {
  return item === "artItem" ? "artItem" : "tags";
};
export const choosePlaceholder = (item: string) => {
  return item === "artItem"
    ? "Harry Potter and the secret chamber"
    : "Cool, Superb, Awesome, Low, Funny";
};
