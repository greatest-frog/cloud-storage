import React from "react";
import { screen, render } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Button from "./Button";

const onClick = jest.fn();

function Mock() {
  return (
    <div className="mock" data-testid="mock">
      Mock
    </div>
  );
}

describe("Button", () => {
  test("renders children", () => {
    render(
      <Button onClick={onClick}>
        <Mock />
      </Button>
    );

    expect(screen.getByTestId("mock")).toBeInTheDocument();
  });

  test("button is clicked once", async () => {
    const user = userEvent.default.setup();
    render(
      <Button onClick={onClick}>
        <Mock />
      </Button>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick.mock.calls).toHaveLength(1);
  });
});
