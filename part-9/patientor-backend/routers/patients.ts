import { Router, Response } from "express";
import * as patientService from "../services/patientService";
import { NonSensitivePatient, Patient, ValidationError } from "../types";
import { newPatientSchema } from "../utils";
import { z } from "zod";

const router = Router();

// get all patients
router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getPatients();

  return res.send(patients);
});

// create a new patient
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

// get a patient by id
router.get("/:id", (req, res: Response<Patient | undefined>) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) {
    return res.status(404).send();
  }

  return res.send(patient);
});

export default router;
