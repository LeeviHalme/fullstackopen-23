const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  // reference all books by this author
  // (n+1 problem)
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
