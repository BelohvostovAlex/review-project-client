import { render, screen, act } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import { AppComment } from "../";

import { IComment } from "../../../models/IComment";

import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: "en",
    },
  });
});

describe("AppComment", () => {
  const comment = {
    _id: "1",
    sender: {
      username: "John",
      _id: "1",
      email: "john@gmail.com",
    },
    review: "review",
    text: "text",
    time: new Date(),
  } as IComment;

  it("alert exists in the doc, with passed open: true and text props", async () => {
    render(<AppComment comment={comment} />);
  });
});
