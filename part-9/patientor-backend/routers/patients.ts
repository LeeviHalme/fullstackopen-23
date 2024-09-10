import { Router, Response } from "express";
import * as patientService from "../services/patientService";
import { NonSensitivePatient, Patient, ValidationError } from "../types";
import { newPatientSchema } from "../utils";
import { z } from "zod";

const router = Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getPatients();

  return res.send(patients);
});

router.post("/", (req, res: Response<Patient | ValidationError>) => {
  try {
    const newPatientEntry = newPatientSchema.parse(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);

    return res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: error.issues });
    } else {
      return res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
