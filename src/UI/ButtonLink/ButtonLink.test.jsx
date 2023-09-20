import React from "react";
import { HashRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ButtonLink from "./ButtonLink";

function Mock() {
  return (
    <div className="mock" data-testid="mock">
      Mock
    </div>
  );
}

describe("ButtonLink", () => {
  test("renders right link", () => {
    render(
      <ButtonLink to="/test">
        <Mock />
      </ButtonLink>,
      { wrapper: HashRouter }
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "#/test");
  });

  test("renders children", () => {
    render(
      <ButtonLink to="/test">
        <Mock />
      </ButtonLink>,
      { wrapper: HashRouter }
    );

    expect(screen.getByTestId("mock")).toBeInTheDocument();
  });
});
