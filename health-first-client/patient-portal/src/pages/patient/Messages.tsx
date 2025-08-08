import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PatientMessages: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Secure messaging with healthcare providers - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientMessages;
