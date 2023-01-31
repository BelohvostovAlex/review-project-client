import { render, screen, act } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import { AppAlert } from "../AppAlert";

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

describe("alert", () => {
  it("alert exists in the doc, with passed open: true and text props", async () => {
    render(<AppAlert open={true} text="AppAlert text" />);
    const alertElement = screen.getByText(/appalert text/i);
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toBeVisible();
  });

  it("alert doesnt exist in the doc, with passed open: false and text props", async () => {
    render(<AppAlert open={false} text="AppAlert text" />);
    const alertElement = screen.queryByText(/appalert text/i);
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should auto hide when the timer is done", async () => {
    jest.useFakeTimers();
    render(<AppAlert open={true} text="AppAlert text" />);
    const alertElement = screen.queryByText(/appalert text/i);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(alertElement).not.toBeVisible();
  });
});
