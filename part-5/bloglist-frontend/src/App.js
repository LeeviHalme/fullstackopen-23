import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // fetch all blogs
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));

    // get user data from localstorage
    const userJSON = window.localStorage.getItem("user");

    if (userJSON) {
      const userData = JSON.parse(userJSON);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  // remove notifications after 8s
  useEffect(() => {
    let interval = null;
    if (notifications.length) {
      interval = setInterval(
        () => setNotifications(data => data.slice(1)),
        8000
      );
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [notifications]);

  // handle user login
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.login({
        username,
        password,
      });

      // Update state and localstorage
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));

      // Send success notification
      const newNotification = {
        success: true,
        text: `Successfully logged in as @${response.username}`,
      };

      setNotifications(data => [...data, newNotification]);
    } catch (exception) {
      const axiosError =
        exception &&
        exception.response &&
        exception.response.data &&
        exception.response.data.error;

      // If this was axios error show the error message
      if (axiosError) {
        const newNotification = {
          success: false,
          text: axiosError,
        };

        setNotifications(data => [...data, newNotification]);
      } else {
        // Else, show a general error message
        const newNotification = {
          success: false,
          text: (exception && exception.message) || "Unknown error",
        };

        setNotifications(data => [...data, newNotification]);
      }
    }
  };

  // handle user logout
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  // handle blog creation
  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      const response = await blogService.create({ title, author, url });

      // Update state
      const blog = { ...response, user: { ...user } };
      setBlogs(data => [...data, blog]);

      // Send success notification
      const newNotification = {
        success: true,
        text: `Successfully added "${response.title}" by ${response.author}`,
      };

      setNotifications(data => [...data, newNotification]);
    } catch (exception) {
      const axiosError =
        exception &&
        exception.response &&
        exception.response.data &&
        exception.response.data.error;

      // If this was axios error show the error message
      if (axiosError) {
        const newNotification = {
          success: false,
          text: axiosError,
        };

        setNotifications(data => [...data, newNotification]);
      } else {
        // Else, show a general error message
        const newNotification = {
          success: false,
          text: (exception && exception.message) || "Unknown error",
        };

        setNotifications(data => [...data, newNotification]);
      }
    }
  };

  // handle blog like
  const handleLike = async blog => {
    try {
      const blogId = blog.id;
      const response = await blogService.update(blogId, {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      });

      // Update state
      setBlogs(state =>
        state.map(blog => (blogId === blog.id ? response : blog))
      );

      // Send success notification
      const newNotification = {
        success: true,
        text: `Successfully liked "${response.title}"`,
      };

      setNotifications(data => [...data, newNotification]);
    } catch (exception) {
      const axiosError =
        exception &&
        exception.response &&
        exception.response.data &&
        exception.response.data.error;

      // If this was axios error show the error message
      if (axiosError) {
        const newNotification = {
          success: false,
          text: axiosError,
        };

        setNotifications(data => [...data, newNotification]);
      } else {
        // Else, show a general error message
        const newNotification = {
          success: false,
          text: (exception && exception.message) || "Unknown error",
        };

        setNotifications(data => [...data, newNotification]);
      }
    }
  };

  // handle blog delete
  const handleDelete = async blogId => {
    try {
      await blogService.remove(blogId);

      // Update state
      setBlogs(state => state.filter(blog => blog.id !== blogId));

      // Send success notification
      const newNotification = {
        success: true,
        text: "Successfully removed blog!",
      };

      setNotifications(data => [...data, newNotification]);
    } catch (exception) {
      const axiosError =
        exception &&
        exception.response &&
        exception.response.data &&
        exception.response.data.error;

      // If this was axios error show the error message
      if (axiosError) {
        const newNotification = {
          success: false,
          text: axiosError,
        };

        setNotifications(data => [...data, newNotification]);
      } else {
        // Else, show a general error message
        const newNotification = {
          success: false,
          text: (exception && exception.message) || "Unknown error",
        };

        setNotifications(data => [...data, newNotification]);
      }
    }
  };

  return (
    <div>
      {notifications.map(({ success, text }, index) => (
        <div
          key={index}
          style={{
            margin: "0.5rem 0",
            padding: "1.5rem",
            background: success ? "#26de81" : "#fc5c65",
            border: `3px solid ${success ? "#20bf6b" : "#eb3b5a"}`,
            borderRadius: "0.5rem",
            color: "white",
          }}
        >
          {text}
        </div>
      ))}
      <h2>Blogs</h2>
      {user ? (
        <div>
          <p>
            Logged In As <b>@{user.username}</b> ({user.name})
          </p>{" "}
          <button style={{ marginBottom: "1rem" }} onClick={handleLogout}>
            logout
          </button>
        </div>
      ) : (
        <div>
          <h3>Login</h3>
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
      {user && (
        <Togglable visibleText="cancel" hiddenText="new blog">
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          canDelete={blog.user.id === (user && user.id)}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
