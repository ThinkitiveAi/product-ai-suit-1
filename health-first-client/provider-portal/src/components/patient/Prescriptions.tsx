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
  IconButton,
} from "@mui/material";
import {
  Medication,
  Add,
  Refresh,
  Message,
  Warning,
  CheckCircle,
} from "@mui/icons-material";

const PatientPrescriptions: React.FC = () => {
  const prescriptions = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refills: 2,
      nextRefill: "2024-02-01",
      status: "active",
      provider: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      refills: 1,
      nextRefill: "2024-01-25",
      status: "refill-needed",
      provider: "Dr. Sarah Johnson",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "refill-needed":
        return "warning";
      case "expired":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}>
        <Typography variant="h4">My Prescriptions</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Request Refill
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Medications
              </Typography>
              <List>
                {prescriptions.map((prescription) => (
                  <ListItem
                    key={prescription.id}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${getStatusColor(
                            prescription.status
                          )}.main`,
                        }}>
                        <Medication />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}>
                          <Typography variant="h6">
                            {prescription.name}
                          </Typography>
                          <Chip
                            label={prescription.status}
                            color={getStatusColor(prescription.status) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {prescription.dosage} - {prescription.frequency}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Refills: {prescription.refills} | Next:{" "}
                            {prescription.nextRefill}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Provider: {prescription.provider}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Refresh />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Message />
                      </IconButton>
                    </Box>
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="outlined" startIcon={<Add />} fullWidth>
                  Request New Prescription
                </Button>
                <Button variant="outlined" startIcon={<Refresh />} fullWidth>
                  Request Refill
                </Button>
                <Button variant="outlined" startIcon={<Message />} fullWidth>
                  Contact Provider
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientPrescriptions;
