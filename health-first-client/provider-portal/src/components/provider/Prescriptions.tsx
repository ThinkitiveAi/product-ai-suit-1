import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import { Medication, Add, Send } from "@mui/icons-material";

const ProviderPrescriptions: React.FC = () => {
  const prescriptions = [
    {
      id: "1",
      patient: "John Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      status: "active",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      medication: "Metformin",
      dosage: "500mg",
      status: "pending",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prescriptions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Prescriptions
              </Typography>
              <List>
                {prescriptions.map((prescription) => (
                  <ListItem key={prescription.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Medication />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${prescription.medication} - ${prescription.dosage}`}
                      secondary={`Patient: ${prescription.patient}`}
                    />
                    <Chip label={prescription.status} color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button variant="outlined" fullWidth startIcon={<Add />}>
                New Prescription
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderPrescriptions;
