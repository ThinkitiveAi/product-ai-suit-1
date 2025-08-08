import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientPrescriptions: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prescriptions
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Prescription management and refill requests - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPrescriptions;
