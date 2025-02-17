import { useState } from "react";
import PropTypes from "prop-types";

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    handleCreateBlog({ title, author, url });
  };

  return (
    <div>
      <hr />
      <h3>Create New Blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label style={{ marginRight: "2rem" }}>Title</label>
          <input
            type="text"
            value={title}
            placeholder="Blog Title"
            id="blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: "0.85rem" }}>Author</label>
          <input
            type="text"
            value={author}
            placeholder="Blog Author"
            id="blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: "2rem" }}>URL</label>
          <input
            type="text"
            value={url}
            placeholder="Blog URL"
            id="blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-btn">
          create
        </button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
