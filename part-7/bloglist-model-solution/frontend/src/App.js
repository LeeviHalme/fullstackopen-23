import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";

import Blog from "./components/Blog";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState("");
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const notifyWith = (message, type) =>
    dispatch(addNotification(message, type));

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    notifyWith("logged out");
  };

  const createBlogHandler = async ({ title, author, url }) => {
    dispatch(createBlog(title, author, url));
    notifyWith(`A new blog '${title}' by '${author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    dispatch(likeBlog(blog));
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(deleteBlog(blog.id));
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlogHandler} />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
