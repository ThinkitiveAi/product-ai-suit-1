import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientBilling: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Billing and payment management - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientBilling;
