import React from "react";
import { screen, render } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import defaultExport from "../../utils/functions/googleSignIn";
import ButtonGoogleAuth from "./ButtonGoogleAuth";

jest.mock("../../utils/functions/googleSignIn", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ButtonGoogleAuth", () => {
  test("renders google icon", () => {
    render(<ButtonGoogleAuth />);

    const googleIcon = screen.getByRole("img");

    expect(googleIcon).toBeInTheDocument();
  });
  test("button is clicked once", async () => {
    const user = userEvent.default.setup();
    render(<ButtonGoogleAuth />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(defaultExport.mock.calls).toHaveLength(1);
  });
});
