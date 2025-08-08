import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientProfile: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Patient profile and personal information - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientProfile;
