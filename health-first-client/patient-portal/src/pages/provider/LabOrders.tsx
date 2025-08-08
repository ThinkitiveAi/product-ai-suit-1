import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ProviderLabOrders: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lab Orders
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Laboratory test ordering and results - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProviderLabOrders;
