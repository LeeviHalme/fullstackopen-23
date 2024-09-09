const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const resolvers = {
  Author: {
    bookCount: async root => root.books?.length || 0,
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
      }

      const newBook = new Book({ ...args, author: author._id });

      // add reference to the author (n+1 problem)
      author.books = author.books.concat(newBook._id);

      try {
        await author.save();
        await newBook.save();

        // return the author object as well
        await newBook.populate("author");

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

        return newBook;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo || author.born;

      try {
        await author.save();

        return author;
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    createUser: async (_, args) => {
      const user = new User({ ...args });

      return user.save().catch(error => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      // FIXME: hard-coded password check
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Failed to login. Invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Query: {
    me: (_, __, context) => context.currentUser,
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, args) => {
      const query = {};

      try {
        // filter based on author
        if (args.author) {
          const author = await Author.findOne({ name: args.author });

          if (!author) {
            return [];
          }

          query.author = author._id;
        }

        // filter based on genre
        if (args.genre) {
          query.genres = { $in: [args.genre] };
        }

        return Book.find(query).populate("author");
      } catch (error) {
        throw new GraphQLError("Fetching books failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    allAuthors: async () => Author.find(),
    recommendedBooks: async (_, __, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return Book.find({ genres: { $in: [currentUser.favoriteGenre] } }).populate("author");
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
