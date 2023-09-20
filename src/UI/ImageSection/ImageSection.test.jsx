import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ImageSection from "./ImageSection";

function Image() {
  return <img src="test.png" alt="test" data-testid="test-image" />;
}
describe("ImageSection", () => {
  test("renders title", () => {
    render(
      <ImageSection
        heading="Test heading"
        text="Test paragraph"
        image={<Image />}
      />
    );

    expect(screen.getByText("Test heading")).toBeInTheDocument();
  });

  test("renders text", () => {
    render(
      <ImageSection
        heading="Test heading"
        text="Test paragraph"
        image={<Image />}
      />
    );

    expect(screen.getByText("Test paragraph")).toBeInTheDocument();
    expect(screen.getByTestId("test-image")).toBeInTheDocument();
  });

  test("renders image", () => {
    render(
      <ImageSection
        heading="Test heading"
        text="Test paragraph"
        image={<Image />}
      />
    );

    expect(screen.getByTestId("test-image")).toBeInTheDocument();
  });
});
