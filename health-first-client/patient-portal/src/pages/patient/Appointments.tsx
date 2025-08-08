import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientAppointments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Patient appointments management page - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientAppointments;
