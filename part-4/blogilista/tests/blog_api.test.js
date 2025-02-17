const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./blog_test_helper");

// alusta testi-tietokanta
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there are initial blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blog identifier is called 'id'", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  describe("creating a new blog", () => {
    test("without authentication fails", async () => {
      await api.post("/api/blogs").send(helper.newBlog);

      const response = await api.get("/api/blogs");

      expect(response.statusCode).toBe(401);
    });

    test("creating a blog works", async () => {
      await api.post("/api/blogs").send(helper.newBlog);

      const response = await api.get("/api/blogs");

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    });

    test("creating a blog without likes works", async () => {
      const newBlog = { ...helper.newBlog };
      delete newBlog.likes;

      const response = await api.post("/api/blogs").send(newBlog);

      expect(response.body).toHaveProperty("likes");
    });

    test("creating a blog without title responds 400", async () => {
      const newBlog = { ...helper.newBlog };
      delete newBlog.title;

      const response = await api.post("/api/blogs").send(newBlog);

      expect(response.statusCode).toBe(400);
    });

    test("creating a blog without url responds 400", async () => {
      const newBlog = { ...helper.newBlog };
      delete newBlog.url;

      const response = await api.post("/api/blogs").send(newBlog);

      expect(response.statusCode).toBe(400);
    });
  });

  describe("deleting a blog", () => {
    test("deleting an new blog works", async () => {
      const initialBlogs = await api.get("/api/blogs");

      // create new blog to get valid ObjectId
      const { body } = await api.post("/api/blogs").send(helper.newBlog);

      // delete blog
      const response = await api.delete(`/api/blogs/${body.id}`);

      // get blogs after delete
      const blogs = await api.get("/api/blogs");

      expect(response.statusCode).toBe(200);
      expect(blogs.body.length).toBe(initialBlogs.body.length);
    });

    test("deleting a blog with non existing id doesn't work", async () => {
      const id = await helper.nonExistingId();
      const response = await api.delete(`/api/blogs/${id}`);
      expect(response.statusCode).toBe(404);
    });

    test("deleting a blog with malformatted id doesn't work", async () => {
      const response = await api.delete("/api/blogs/non-existing-id");
      expect(response.statusCode).toBe(400);
    });
  });

  describe("updating a blog", () => {
    test("updating an new blog works", async () => {
      const initialBlogs = await api.get("/api/blogs");
      const firstId = initialBlogs.body[0].id;
      const url = "https://google.com";

      // update first blog
      const response = await api.put(`/api/blogs/${firstId}`).send({ url });

      expect(response.statusCode).toBe(200);
      expect(response.body.url).toBe(url);
    });

    test("updating a blog with non existing id doesn't work", async () => {
      const id = await helper.nonExistingId();
      const response = await api.put(`/api/blogs/${id}`);
      expect(response.statusCode).toBe(404);
    });

    test("updating a blog with malformatted id doesn't work", async () => {
      const response = await api.put("/api/blogs/non-existing-id");
      expect(response.statusCode).toBe(400);
    });
  });
});

// sulje tietokantayhteys
afterAll(async () => {
  await mongoose.connection.close();
});
