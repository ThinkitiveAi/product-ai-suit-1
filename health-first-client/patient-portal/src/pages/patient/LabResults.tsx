import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientLabResults: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lab Results
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Laboratory test results and reports - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientLabResults;
