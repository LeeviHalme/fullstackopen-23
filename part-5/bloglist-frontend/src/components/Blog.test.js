import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders content", () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        id: "640f2a35f3b644fdb904a071",
      },
      id: "63bdb7ed445a3f37a2db9fd8",
    };

    render(
      <Blog
        blog={blog}
        handleLike={() => null}
        canDelete={false}
        handleDelete={() => null}
      />
    );

    const element = screen.getByText("React patterns");

    expect(element).toBeDefined();
  });

  test("renders all content after button press", async () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        id: "640f2a35f3b644fdb904a071",
      },
      id: "63bdb7ed445a3f37a2db9fd8",
    };

    render(
      <Blog
        blog={blog}
        handleLike={() => null}
        canDelete={false}
        handleDelete={() => null}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");

    // toggle blog info
    await user.click(button);

    const url = screen.getByText("https://reactpatterns.com/");
    const likes = screen.getByText("likes 7");
    const creator = screen.getByText("Matti Luukkainen");

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(creator).toBeDefined();
  });

  test("like-button works", async () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        id: "640f2a35f3b644fdb904a071",
      },
      id: "63bdb7ed445a3f37a2db9fd8",
    };

    const likeFn = jest.fn();

    render(
      <Blog
        blog={blog}
        handleLike={likeFn}
        canDelete={false}
        handleDelete={() => null}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");

    // toggle blog info
    await user.click(button);

    const likeBtn = screen.getByText("like");

    // click like two times
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeFn.mock.calls).toHaveLength(2);
  });
});
