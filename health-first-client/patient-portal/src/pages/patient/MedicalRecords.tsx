import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const PatientMedicalRecords: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medical Records
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Medical records and health history - Coming soon!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientMedicalRecords; 