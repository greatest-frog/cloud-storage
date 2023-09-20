import React from "react";
import { HashRouter } from "react-router-dom";
import { screen, render, act } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Auth from "./Auth";

const mockHandleSubmit = jest.fn();
mockHandleSubmit.mockImplementation((event) => event.preventDefault());
const mockError = "mockError";
const mockEmail = "mockEmail";
const mockPassword = "mockPassword";
const mockButtonPlaceholder = "mockButton";
const mockQuestion = "mockQuestion";
const mockAnswer = "mockAnswer";
const mockLink = "/mockLink";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Auth", () => {
  test("email input works", async () => {
    const user = userEvent.default.setup();
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
      />
    );

    const emailInput = screen.getByLabelText("Email");

    await act(async () => {
      await user.type(emailInput, mockEmail);
    });

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue(mockEmail);
  });

  test("password input works", async () => {
    const user = userEvent.default.setup();
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
      />
    );

    const passwordInput = screen.getByLabelText("Password");

    await act(async () => {
      await user.type(passwordInput, mockPassword);
    });

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue(mockPassword);
  });

  test("renders error message", () => {
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
        errorMessage={mockError}
      />
    );

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  test("renders restore section", () => {
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
        isRestoreMessage
      />,
      { wrapper: HashRouter }
    );

    expect(screen.getByText(/Restore/i)).toBeInTheDocument();
  });

  test("renders question block", () => {
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
        question={mockQuestion}
        answer={mockAnswer}
        answerLink={mockLink}
      />,
      { wrapper: HashRouter }
    );

    expect(screen.getByText(new RegExp(mockQuestion, "i"))).toBeInTheDocument();
    expect(screen.getByText(mockAnswer)).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();

    expect(screen.getByRole("link")).toHaveAttribute("href", `#${mockLink}`);
  });

  test("submits form", async () => {
    const user = userEvent.default.setup();
    render(
      <Auth
        handleSubmit={mockHandleSubmit}
        buttonPlaceholder={mockButtonPlaceholder}
      />
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const buttonSubmit = screen.getByRole("button", {
      name: mockButtonPlaceholder,
    });

    await act(async () => {
      await user.type(emailInput, mockEmail);
      await user.type(passwordInput, mockPassword);
    });
    await user.click(buttonSubmit);

    expect(buttonSubmit).toBeInTheDocument();
    expect(mockHandleSubmit.mock.calls).toHaveLength(1);
    expect(mockHandleSubmit.mock.calls[0][1]).toBe(mockEmail);
    expect(mockHandleSubmit.mock.calls[0][2]).toBe(mockPassword);
  });
});
