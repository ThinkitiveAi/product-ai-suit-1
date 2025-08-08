import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderSchedule: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Calendar and schedule management - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderSchedule;
