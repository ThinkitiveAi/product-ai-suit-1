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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Event,
  Person,
  Phone,
  Message,
  Add,
  Edit,
  Cancel,
  CheckCircle,
  Warning,
} from "@mui/icons-material";

const PatientAppointments: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock data
  const appointments = [
    {
      id: "1",
      date: "2024-01-15",
      time: "10:00 AM",
      provider: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      type: "Follow-up",
      status: "confirmed",
      notes: "Annual checkup and medication review",
    },
    {
      id: "2",
      date: "2024-01-20",
      time: "02:30 PM",
      provider: "Dr. Michael Chen",
      specialty: "Dermatology",
      type: "New Patient",
      status: "pending",
      notes: "Skin condition evaluation",
    },
    {
      id: "3",
      date: "2024-01-25",
      time: "09:15 AM",
      provider: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      type: "Lab Results",
      status: "confirmed",
      notes: "Review blood test results",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handleOpenDialog = (appointment?: any) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
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
        <Typography variant="h4">My Appointments</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}>
          Book Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <List>
                {appointments.map((appointment, index) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${getStatusColor(appointment.status)}.main`,
                        }}>
                        <Event />
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
                            {appointment.provider}
                          </Typography>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.specialty} - {appointment.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.notes}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Message />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Phone />
                      </IconButton>
                      <IconButton size="small" color="warning">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Cancel />
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
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  fullWidth
                  onClick={() => handleOpenDialog()}>
                  Book New Appointment
                </Button>
                <Button variant="outlined" startIcon={<Message />} fullWidth>
                  Contact Provider
                </Button>
                <Button variant="outlined" startIcon={<Event />} fullWidth>
                  View Calendar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointment Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth>
        <DialogTitle>
          {selectedAppointment ? "Edit Appointment" : "Book New Appointment"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Provider"
                defaultValue={selectedAppointment?.provider || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                defaultValue={selectedAppointment?.date || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                defaultValue={selectedAppointment?.time || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select defaultValue={selectedAppointment?.type || ""}>
                  <MenuItem value="checkup">Checkup</MenuItem>
                  <MenuItem value="follow-up">Follow-up</MenuItem>
                  <MenuItem value="consultation">Consultation</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                defaultValue={selectedAppointment?.notes || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedAppointment ? "Update" : "Book"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientAppointments;
