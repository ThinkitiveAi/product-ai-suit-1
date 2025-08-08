import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderPrescriptions: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prescriptions
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            E-prescribing and medication management - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderPrescriptions;
