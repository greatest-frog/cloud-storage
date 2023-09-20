import React from "react";
import { screen, render } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ButtonHamburger from "./ButtonHamburger";

const toggleOpen = jest.fn();

describe("ButtonHumburger", () => {
  test("renders lines closed", () => {
    render(<ButtonHamburger toggleOpen={toggleOpen} open={false} />);

    const lines = screen.getAllByTestId("burger-line");

    expect(lines).toHaveLength(4);
    lines.forEach((line) =>
      expect(line).toHaveClass("ButtonHamburger-Line_status_closed")
    );
  });

  test("renders lines open", () => {
    render(<ButtonHamburger toggleOpen={toggleOpen} open />);

    const lines = screen.getAllByTestId("burger-line");

    expect(lines).toHaveLength(4);
    lines.forEach((line) =>
      expect(line).toHaveClass("ButtonHamburger-Line_status_open")
    );
  });

  test("button is clicked once", async () => {
    const user = userEvent.default.setup();
    render(<ButtonHamburger toggleOpen={toggleOpen} open={false} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(toggleOpen.mock.calls).toHaveLength(1);
  });
});
