import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import { AppDivider } from "../";

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

describe("divider", () => {
  it("divider exists in the doc correctly", async () => {
    render(<AppDivider />);
    const headingElement = screen.getByTestId("divider-text");
    expect(headingElement).toBeInTheDocument();
  });

  it("divider should use default translated text without passed into title prop", async () => {
    render(<AppDivider />);
    expect(tSpy.mock.calls).toHaveLength(1);
  });

  it("divider should render same text passed into title prop", async () => {
    render(<AppDivider title="Divider Text" />);
    expect(screen.getByText(/divider text/i));
  });
});
