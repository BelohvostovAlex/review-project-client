import { render, screen } from "@testing-library/react";
import { AppBanner } from "../AppBanner";

import "@testing-library/jest-dom";

describe("backdrop", () => {
  it("AppBanner exists with only title prop", async () => {
    render(<AppBanner title="AppBanner title" />);
    const appBannerTitle = screen.getByText(/appbanner title/i);

    expect(appBannerTitle).toBeInTheDocument();
    expect(appBannerTitle).toMatchSnapshot();
  });

  it("AppBanner exists with title,text props", async () => {
    render(<AppBanner title="AppBanner title" text="AppBanner text" />);
    const appBannerTitle = screen.getByText(/appbanner title/i);
    const appBannerText = screen.getByText(/appbanner text/i);

    expect(appBannerTitle).toBeInTheDocument();
    expect(appBannerText).toBeInTheDocument();
  });
});
