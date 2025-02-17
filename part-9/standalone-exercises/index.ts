import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { parseArguments } from "./utils/parseExerciseArgs";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  if (!req.body?.daily_exercises || !req.body?.target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const { daily_exercises, target } = req.body;

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    // hack the parseArguments function to use it
    // also as a validator for the request body
    const { value1, value2 } = parseArguments([
      null,
      null,
      target.toString(),
      ...daily_exercises.map(String),
    ]);

    return res.json(calculateExercises(value1, value2));
  } catch (error) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
