import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderSettings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Practice settings and preferences - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderSettings;
