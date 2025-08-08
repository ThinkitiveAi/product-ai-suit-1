import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderMessages: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Secure messaging with patients and staff - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderMessages;
