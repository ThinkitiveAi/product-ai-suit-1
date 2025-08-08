import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Event,
  Medication,
  Science,
  Payment,
  Message,
  CheckCircle,
  Schedule,
  LocalHospital,
} from "@mui/icons-material";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAppointments } from "../../store/slices/appointmentSlice";
import { fetchPrescriptions } from "../../store/slices/prescriptionSlice";
import { fetchLabResults } from "../../store/slices/labResultSlice";
import { fetchBillingRecords } from "../../store/slices/billingSlice";
import { fetchMessages } from "../../store/slices/messageSlice";
import { useAuth } from "../../contexts/AuthContext";

const PatientDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const { appointments } = useSelector(
    (state: RootState) => state.appointments
  );
  const { prescriptions } = useSelector(
    (state: RootState) => state.prescriptions
  );
  const { labResults } = useSelector((state: RootState) => state.labResults);
  const { billingRecords } = useSelector((state: RootState) => state.billing);
  const { messages } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchPrescriptions());
    dispatch(fetchLabResults());
    dispatch(fetchBillingRecords());
    dispatch(fetchMessages());
  }, [dispatch]);

  const upcomingAppointments = appointments
    .filter((apt) => apt.status === "scheduled" || apt.status === "confirmed")
    .slice(0, 3);

  const recentLabResults = labResults.slice(0, 2);
  const activePrescriptions = prescriptions.filter(
    (p) => p.status === "active"
  );
  const unreadMessages = messages.filter((m) => !m.isRead);
  const pendingBills = billingRecords.filter((b) => b.status === "pending");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "primary";
      case "confirmed":
        return "success";
      case "completed":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your health overview for today
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <Event />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {upcomingAppointments.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Appointments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                  <Medication />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {activePrescriptions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Medications
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                  <Message />
                </Avatar>
                <Box>
                  <Typography variant="h6">{unreadMessages.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unread Messages
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
                  <Payment />
                </Avatar>
                <Box>
                  <Typography variant="h6">{pendingBills.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Bills
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Upcoming Appointments</Typography>
              </Box>
              {upcomingAppointments.length > 0 ? (
                <List>
                  {upcomingAppointments.map((appointment, index) => (
                    <React.Fragment key={appointment.id}>
                      <ListItem>
                        <ListItemIcon>
                          <LocalHospital color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={appointment.providerName}
                          secondary={`${appointment.date} at ${appointment.time} - ${appointment.reason}`}
                        />
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status) as any}
                          size="small"
                        />
                      </ListItem>
                      {index < upcomingAppointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ py: 2 }}>
                  No upcoming appointments
                </Typography>
              )}
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  (window.location.href = "/patient-portal/appointments")
                }>
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Lab Results */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Science sx={{ mr: 1, color: "secondary.main" }} />
                <Typography variant="h6">Recent Lab Results</Typography>
              </Box>
              {recentLabResults.length > 0 ? (
                <List>
                  {recentLabResults.map((result, index) => (
                    <React.Fragment key={result.id}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary={result.testName}
                          secondary={`Completed: ${result.dateCompleted}`}
                        />
                        <Chip
                          label={result.status}
                          color={
                            result.status === "completed"
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                      </ListItem>
                      {index < recentLabResults.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ py: 2 }}>
                  No recent lab results
                </Typography>
              )}
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  (window.location.href = "/patient-portal/lab-results")
                }>
                View All Results
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Blood Pressure</Typography>
                  <Typography variant="body2" color="success.main">
                    Normal
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  color="success"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Blood Sugar</Typography>
                  <Typography variant="body2" color="warning.main">
                    Elevated
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  color="warning"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Weight</Typography>
                  <Typography variant="body2" color="success.main">
                    Stable
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  color="success"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Event />}
                    onClick={() =>
                      (window.location.href = "/patient-portal/appointments")
                    }>
                    Book Appointment
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Medication />}
                    onClick={() =>
                      (window.location.href = "/patient-portal/prescriptions")
                    }>
                    Request Refill
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Message />}
                    onClick={() =>
                      (window.location.href = "/patient-portal/messages")
                    }>
                    Send Message
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Payment />}
                    onClick={() =>
                      (window.location.href = "/patient-portal/billing")
                    }>
                    Pay Bill
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
