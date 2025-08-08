import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderPatients: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Patient management and records - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderPatients;
