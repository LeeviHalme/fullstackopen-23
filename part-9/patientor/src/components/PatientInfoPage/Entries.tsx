import axios from "axios";
import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../constants";
import diagnosisService from "../../services/diagnoses";

interface EntriesProps {
  entries: Entry[];
}

const Entries = (props: EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosisList = async () => {
      const patients = await diagnosisService.getAll();
      setDiagnoses(patients);
    };
    void fetchDiagnosisList();
  }, []);

  const getDiagnosisFromCode = (code: Diagnosis["code"]) => {
    return diagnoses.find(diagnosis => diagnosis.code === code)?.name;
  };

  if (props.entries?.length === 0) {
    return <Typography fontSize="small">No entries</Typography>;
  }

  return props.entries.map(entry => (
    <div key={entry.id}>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {getDiagnosisFromCode(code)}
          </li>
        ))}
      </ul>
    </div>
  ));
};
export default Entries;
