require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

// Setup morgan
const format =
  ":method :url :status :res[content-length] - :response-time ms :json";
morgan.token("json", req => JSON.stringify(req.body));

// Setup express app
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(format));

// Get app info
app.get("/info", async (req, res, next) => {
  try {
    const count = await Person.countDocuments();
    return res.send(
      `The phonebook has info for ${count} people <br> <br> ${new Date()}`
    );
  } catch (error) {
    next(error);
  }
});

// Get all persons
app.get("/api/persons", async (req, res, next) => {
  try {
    const people = await Person.find({});
    return res.json(people);
  } catch (error) {
    next(error);
  }
});

// Create a new person
app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;
  // Validate body
  if (!name && !number)
    return res.status(400).json({ error: "please provide name and number" });

  // Find existing entry
  // const existing = persons.find(person => person.name === name);
  // if (existing) return res.status(400).json({ error: "name must be unique" });

  // Add entry
  const newPerson = new Person({ name, number });

  try {
    // Save entry
    await newPerson.save();
    return res.json(newPerson.toJSON());
  } catch (error) {
    next(error);
  }
});

// Get a specific person
app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) return res.sendStatus(404);

    return res.json(person);
  } catch (error) {
    next(error);
  }
});

// Update a person
app.put("/api/persons/:id", async (req, res, next) => {
  const { name, number } = req.body;
  try {
    // Update person
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      {
        name,
        number,
      },
      { new: true, runValidators: true }
    );

    return res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

// Delete a person
app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    await Person.deleteOne({ _id: req.params.id });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// olemattomien osoitteiden käsittely
app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

// virheellisten pyyntöjen käsittely
app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
});

// Start listening on default port 3000
const port = process.env.PORT;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
