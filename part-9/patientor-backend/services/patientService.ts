import patientData from "../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v4 as uuid } from "uuid";

export const getPatients = (): NonSensitivePatient[] => {
  // remove ssn from patient data
  return patientData.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), entries: [], ...entry };

  patientData.push(newPatient);

  return newPatient;
};

export const getPatient = (id: string): Patient | undefined => {
  return patientData.find(patient => patient.id === id);
};
