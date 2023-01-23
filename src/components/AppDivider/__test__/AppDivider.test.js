import { render, screen } from "@testing-library/react";
import { AppDivider } from "../AppDivider";

import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

test("divider exists in the doc correctly", async () => {
  render(<AppDivider />);
  const headingElement = screen.getByTestId("divider-text");
  expect(headingElement).toBeInTheDocument();
});

test("divider should render same text passed into title prop", async () => {
  render(<AppDivider title="Divider Text" />);
  expect(screen.getByText(/divider text/i));
});
