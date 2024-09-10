import diagnosisData from "../data/diagnoses";
import { Diagnosis } from "../types";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

export const addDiagnosis = (): null => {
  return null;
};
