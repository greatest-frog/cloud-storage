import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import UserBanner from "./UserBanner";

describe("PersonInfo", () => {
  test("renders name", () => {
    render(<UserBanner name="user1" />);

    expect(screen.getByText("user1")).toBeInTheDocument();
  });

  test("renders default image when image is't provided", () => {
    render(<UserBanner name="user1" />);

    const avatar = screen.getByRole("img");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "default.png");
    expect(avatar).toHaveAttribute("alt", "Avatar");
  });

  test("renders provided image", () => {
    render(<UserBanner name="user1" photoURL="test.png" />);

    const avatar = screen.getByRole("img");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "test.png");
    expect(avatar).toHaveAttribute("alt", "Avatar");
  });
});
