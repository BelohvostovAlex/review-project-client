import { render, screen } from "@testing-library/react";
import { AppBackDrop } from "../AppBackDrop";

import "@testing-library/jest-dom";

describe("backdrop", () => {
  it("AppBackDrop and its children exist when pass open:true, children props", async () => {
    render(<AppBackDrop open={true} children={<h1>Hello</h1>} />);
    const childrenHeading = screen.getByText("Hello");
    const appBackDrop = screen.getByTestId("backDrop-testId");

    expect(appBackDrop).toBeInTheDocument();
    expect(childrenHeading).toBeInTheDocument();
    expect(childrenHeading).toBeVisible();
  });

  it("AppBackDrop and its children are hidden with open:false, children props", async () => {
    render(<AppBackDrop open={false} children={<h1>Hello</h1>} />);
    const children = screen.queryByText("Hello");
    const appBackDrop = screen.queryByTestId("backDrop-testId");

    expect(appBackDrop).not.toBeVisible();
    expect(children).not.toBeVisible();
  });
});
