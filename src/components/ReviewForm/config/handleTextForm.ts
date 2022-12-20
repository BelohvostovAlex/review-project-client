export const handleTextForm = (isEdit: boolean) => ({
  title: {
    placeholder: "My Review for Harry Potter",
    label: "Review Title",
  },
  artItem: {
    textFieldTitle: "Choose Art Item..",
    dialogueText: "Did you miss any art of piece in our list? Please, add it!",
    dialogueTitle: "Add a new Art Item",
  },
  text: {
    placeholder: "As for me Harry Potter is my favourite movie, because..",
    label: "Review text",
  },
  tags: {
    textFieldTitle: "Enter tags..",
    dialogueText: "Did you miss any tag in our list? Please, add it!",
    dialogueTitle: "Add a new Tag",
  },
  submitBtn: isEdit ? "Edit" : "Create",
  alertText: isEdit
    ? "Your review was successfully updated!"
    : "Your review was successfully created!",
});
