import express from "express";
import cors from "cors";

import diagnosisRouter from "./routers/diagnoses";
import patientRouter from "./routers/patients";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  return res.json({ message: "pong" });
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
