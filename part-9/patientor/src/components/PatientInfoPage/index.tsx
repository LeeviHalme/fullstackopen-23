import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Entries from "./Entries";

interface PatientInfoPageProps {
  patients: Patient[];
}

const index = (props: PatientInfoPageProps) => {
  const params = useParams();
  const getPatient = useCallback(
    () => props.patients.find(p => p.id === params.id),
    [props.patients, params.id]
  );

  return (
    <Box>
      <Typography variant="h6" my={2}>
        Patient information
      </Typography>
      <Typography fontWeight="bold">{getPatient()?.name}</Typography>
      <Typography>ssn: {getPatient()?.ssn}</Typography>
      <Typography>occupation: {getPatient()?.occupation}</Typography>
      <Typography variant="h6" my={2}>
        Entries
      </Typography>
      <Entries entries={getPatient()?.entries || []} />
    </Box>
  );
};

export default index;
