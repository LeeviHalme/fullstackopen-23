import { HealthCheckRating, Entry, Gender, NewPatient, OccupationalHealthcareEntry } from "./types";
import { z } from "zod";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number";
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(param);
};

const isType = (param: string): param is Entry["type"] => {
  return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name`);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error(`Incorrect or missing dateOfBirth`);
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn`);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation`);
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender`);
  }

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseEntryType = (type: unknown): string => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error(`Incorrect or missing type`);
  }

  return type;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id`);
  }

  return id;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description`);
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error(`Incorrect or missing date`);
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist`);
  }

  return specialist;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing rating`);
  }

  return rating;
};

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "id" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const type = parseEntryType(object.type);
    const optionalProperties: Partial<Entry> = {};

    if ("diagnosisCodes" in object) {
      if (
        !Array.isArray(object.diagnosisCodes) ||
        object.diagnosisCodes.some(code => !isString(code))
      ) {
        throw new Error("Incorrect data: diagnosisCodes is not an array of strings");
      }

      optionalProperties.diagnosisCodes = object.diagnosisCodes;
    }

    switch (type) {
      case "Hospital":
        if (
          !("discharge" in object) ||
          // @ts-ignore
          !("date" in object.discharge) ||
          !("criteria" in object.discharge)
        ) {
          throw new Error("Incorrect data: some fields are missing (Hospital)");
        }

        return {
          ...optionalProperties,
          id: parseId(object.id),
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type,
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseDescription(object.discharge.criteria),
          },
        };
      case "OccupationalHealthcare":
        if (!("employerName" in object)) {
          throw new Error("Incorrect data: some fields are missing (OccupationalHealthcare)");
        }

        const toReturn: OccupationalHealthcareEntry = {
          ...optionalProperties,
          id: parseId(object.id),
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type,
          employerName: parseName(object.employerName),
        };

        if ("sickLeave" in object) {
          // @ts-ignore
          if (!("startDate" in object.sickLeave) || !("endDate" in object.sickLeave)) {
            throw new Error("Incorrect data: some fields are missing (OccupationalHealthcare)");
          }

          toReturn.sickLeave = {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          };
        }

        return toReturn;
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Incorrect data: some fields are missing (HealthCheck)");
        }

        return {
          ...optionalProperties,
          id: parseId(object.id),
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});
