import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import CreateBlogForm from "./CreateBlogForm";

describe("<CreateBlogForm />", () => {
  test("calls handler function with right values", async () => {
    const createFn = jest.fn();
    const user = userEvent.setup();

    render(<CreateBlogForm handleCreateBlog={createFn} />);

    const title = screen.getByPlaceholderText("Blog Title");
    const author = screen.getByPlaceholderText("Blog Author");
    const url = screen.getByPlaceholderText("Blog URL");
    const button = screen.getByText("create");

    await user.type(title, "example title");
    await user.type(author, "example author");
    await user.type(url, "author.com");
    await user.click(button);

    expect(createFn.mock.calls).toHaveLength(1);
    expect(createFn.mock.calls[0][0].title).toBe("example title");
    expect(createFn.mock.calls[0][0].author).toBe("example author");
    expect(createFn.mock.calls[0][0].url).toBe("author.com");
  });
});
