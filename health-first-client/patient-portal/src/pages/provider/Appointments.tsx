import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderAppointments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Appointment management and scheduling - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderAppointments;
