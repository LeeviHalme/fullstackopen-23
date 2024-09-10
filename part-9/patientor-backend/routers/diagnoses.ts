import { Response, Router } from "express";
import { Diagnosis } from "../types";
import { getDiagnoses } from "../services/diagnosisService";

const router = Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = getDiagnoses();

  return res.json(diagnoses);
});

export default router;
