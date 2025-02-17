import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (_, action) => {
      return [...action.payload];
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    removeBlogById: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    addLikeToBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const blog = await blogService.create({ title, author, url });
    dispatch(addBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlogById(id));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like(blog);
    dispatch(addLikeToBlog(blog.id));
  };
};

export const { setBlogs, addBlog, removeBlogById, addLikeToBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
