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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  People,
  Event,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  Medication,
  Science,
  Message,
  Add,
  Visibility,
} from "@mui/icons-material";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAppointments } from "../../store/slices/appointmentSlice";
import { fetchPatients } from "../../store/slices/patientSlice";
import { fetchPrescriptions } from "../../store/slices/prescriptionSlice";
import { fetchLabResults } from "../../store/slices/labResultSlice";
import { fetchBillingRecords } from "../../store/slices/billingSlice";
import { fetchMessages } from "../../store/slices/messageSlice";
import { useAuth } from "../../contexts/AuthContext";

const ProviderDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const { appointments } = useSelector(
    (state: RootState) => state.appointments
  );
  const { patients } = useSelector((state: RootState) => state.patients);
  const { labResults } = useSelector((state: RootState) => state.labResults);
  const { billingRecords } = useSelector((state: RootState) => state.billing);
  const { messages } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchPatients());
    dispatch(fetchPrescriptions());
    dispatch(fetchLabResults());
    dispatch(fetchBillingRecords());
    dispatch(fetchMessages());
  }, [dispatch]);

  const todayAppointments = appointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0]
  );

  const urgentAppointments = appointments.filter(
    (apt) => apt.type === "emergency" && apt.status === "scheduled"
  );

  const pendingLabResults = labResults.filter(
    (result) => result.status === "pending"
  );
  const unreadMessages = messages.filter((m) => !m.isRead);
  const totalRevenue = billingRecords.reduce(
    (sum, bill) => sum + bill.paidAmount,
    0
  );

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
          Good morning, Dr. {user?.lastName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your practice overview for today
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
                    {todayAppointments.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Today's Appointments
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
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h6">{patients.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Patients
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
                  <Warning />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {urgentAppointments.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Urgent Cases
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
                <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    ${totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Revenue This Month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Schedule sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">Today's Schedule</Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  size="small"
                  onClick={() =>
                    (window.location.href = "/provider-portal/appointments")
                  }>
                  Add Appointment
                </Button>
              </Box>

              {todayAppointments.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Patient</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {todayAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.patientName}</TableCell>
                          <TableCell>
                            <Chip
                              label={appointment.type}
                              size="small"
                              color={
                                appointment.type === "emergency"
                                  ? "error"
                                  : "default"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={appointment.status}
                              color={getStatusColor(appointment.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              startIcon={<Visibility />}
                              onClick={() =>
                                (window.location.href = `/provider-portal/appointments`)
                              }>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ py: 4 }}>
                  No appointments scheduled for today
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Alerts */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<People />}
                    onClick={() =>
                      (window.location.href = "/provider-portal/patients")
                    }>
                    View Patients
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Event />}
                    onClick={() =>
                      (window.location.href = "/provider-portal/schedule")
                    }>
                    Manage Schedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Medication />}
                    onClick={() =>
                      (window.location.href = "/provider-portal/prescriptions")
                    }>
                    E-Prescribe
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Science />}
                    onClick={() =>
                      (window.location.href = "/provider-portal/lab-orders")
                    }>
                    Order Labs
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alerts & Notifications
              </Typography>
              <List>
                {urgentAppointments.length > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${urgentAppointments.length} urgent appointments`}
                      secondary="Requires immediate attention"
                    />
                  </ListItem>
                )}
                {pendingLabResults.length > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <Science color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${pendingLabResults.length} pending lab results`}
                      secondary="Ready for review"
                    />
                  </ListItem>
                )}
                {unreadMessages.length > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <Message color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${unreadMessages.length} unread messages`}
                      secondary="From patients and staff"
                    />
                  </ListItem>
                )}
                {urgentAppointments.length === 0 &&
                  pendingLabResults.length === 0 &&
                  unreadMessages.length === 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="All caught up!"
                        secondary="No urgent notifications"
                      />
                    </ListItem>
                  )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Patient Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Patient Activity
              </Typography>
              <List>
                {patients.slice(0, 5).map((patient, index) => (
                  <React.Fragment key={patient.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {patient.firstName.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${patient.firstName} ${patient.lastName}`}
                        secondary={`Last visit: ${patient.lastVisit}`}
                      />
                      <Chip
                        label={patient.status}
                        color={
                          patient.status === "active" ? "success" : "default"
                        }
                        size="small"
                      />
                    </ListItem>
                    {index < Math.min(patients.length, 5) - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  (window.location.href = "/provider-portal/patients")
                }>
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Practice Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Practice Metrics
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Patient Satisfaction</Typography>
                  <Typography variant="body2" color="success.main">
                    94%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={94}
                  color="success"
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">
                    Appointment Completion
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    87%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={87}
                  color="primary"
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Response Time</Typography>
                  <Typography variant="body2" color="warning.main">
                    2.3 hrs
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  color="warning"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderDashboard;
