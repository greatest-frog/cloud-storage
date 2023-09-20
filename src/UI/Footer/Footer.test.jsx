import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "./Footer";

describe("Footer", () => {
  test("renders text", () => {
    render(<Footer />);

    expect(screen.getByText("Project by greatest-frog")).toBeInTheDocument();

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test("renders link", () => {
    render(<Footer />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test("renders icon", () => {
    render(<Footer />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `${process.env.PUBLIC_URL}/resources/images/github-mark.svg`
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "GitHub");
  });
});
