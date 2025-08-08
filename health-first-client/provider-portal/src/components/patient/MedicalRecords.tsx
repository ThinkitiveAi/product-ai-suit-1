import React, { useState } from "react";
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
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Description,
  Science,
  Medication,
  Event,
  Download,
  Visibility,
  Add,
  History,
  TrendingUp,
} from "@mui/icons-material";

const PatientMedicalRecords: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // Mock data
  const medicalRecords = {
    labResults: [
      {
        id: "1",
        type: "Blood Test",
        date: "2024-01-10",
        status: "normal",
        provider: "Dr. Sarah Johnson",
        results: "All values within normal range",
      },
      {
        id: "2",
        type: "Cholesterol Panel",
        date: "2024-01-10",
        status: "warning",
        provider: "Dr. Sarah Johnson",
        results: "LDL slightly elevated",
      },
    ],
    medications: [
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2023-06-15",
        endDate: null,
        status: "active",
        provider: "Dr. Sarah Johnson",
      },
      {
        id: "2",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2023-08-20",
        endDate: null,
        status: "active",
        provider: "Dr. Sarah Johnson",
      },
    ],
    procedures: [
      {
        id: "1",
        type: "Annual Physical",
        date: "2024-01-10",
        provider: "Dr. Sarah Johnson",
        notes: "Routine checkup, all systems normal",
      },
      {
        id: "2",
        type: "EKG",
        date: "2023-12-15",
        provider: "Dr. Sarah Johnson",
        notes: "Normal sinus rhythm",
      },
    ],
    immunizations: [
      {
        id: "1",
        name: "Flu Shot",
        date: "2023-10-15",
        provider: "Dr. Sarah Johnson",
        nextDue: "2024-10-15",
      },
      {
        id: "2",
        name: "COVID-19 Booster",
        date: "2023-09-20",
        provider: "Dr. Sarah Johnson",
        nextDue: "2024-09-20",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "success";
      case "warning":
        return "warning";
      case "critical":
        return "error";
      case "active":
        return "success";
      default:
        return "default";
    }
  };

  const handleOpenDialog = (record?: any) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecord(null);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0: // Lab Results
        return (
          <List>
            {medicalRecords.labResults.map((result) => (
              <ListItem
                key={result.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 2,
                }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: `${getStatusColor(result.status)}.main` }}>
                    <Science />
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
                      <Typography variant="h6">{result.type}</Typography>
                      <Chip
                        label={result.status}
                        color={getStatusColor(result.status) as any}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(result.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {result.provider}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Results: {result.results}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Download />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        );

      case 1: // Medications
        return (
          <List>
            {medicalRecords.medications.map((med) => (
              <ListItem
                key={med.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 2,
                }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: `${getStatusColor(med.status)}.main` }}>
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
                      <Typography variant="h6">{med.name}</Typography>
                      <Chip
                        label={med.status}
                        color={getStatusColor(med.status) as any}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {med.dosage} - {med.frequency}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Started: {new Date(med.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {med.provider}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Download />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        );

      case 2: // Procedures
        return (
          <List>
            {medicalRecords.procedures.map((procedure) => (
              <ListItem
                key={procedure.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 2,
                }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <Event />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {procedure.type}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(procedure.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {procedure.provider}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Notes: {procedure.notes}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Download />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        );

      case 3: // Immunizations
        return (
          <List>
            {medicalRecords.immunizations.map((immunization) => (
              <ListItem
                key={immunization.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 2,
                }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <TrendingUp />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {immunization.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(immunization.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {immunization.provider}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Next Due:{" "}
                        {new Date(immunization.nextDue).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Download />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        );

      default:
        return null;
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
        <Typography variant="h4">Medical Records</Typography>
        <Button variant="contained" startIcon={<Download />}>
          Download All Records
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}>
            <Tab label="Lab Results" />
            <Tab label="Medications" />
            <Tab label="Procedures" />
            <Tab label="Immunizations" />
          </Tabs>

          {renderTabContent()}
        </CardContent>
      </Card>

      {/* Record Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth>
        <DialogTitle>
          {selectedRecord ? "Medical Record Details" : "Add Record"}
        </DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedRecord.type || selectedRecord.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Date: {new Date(selectedRecord.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Provider: {selectedRecord.provider}
              </Typography>
              {selectedRecord.results && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  Results: {selectedRecord.results}
                </Typography>
              )}
              {selectedRecord.notes && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  Notes: {selectedRecord.notes}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" startIcon={<Download />}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientMedicalRecords;
