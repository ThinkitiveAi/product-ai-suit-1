import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Event,
  LocalHospital,
  Medication,
  Science,
  Message,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Schedule,
  Person,
  Phone,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import StatCard from "../ui/StatCard";
import HealthChart from "../ui/HealthChart";

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Mock data - in real app, this would come from API
  const mockData = {
    nextAppointment: {
      id: "1",
      date: "2024-01-15",
      time: "10:00 AM",
      provider: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      type: "Follow-up",
    },
    recentResults: [
      {
        id: "1",
        type: "Blood Test",
        date: "2024-01-10",
        status: "normal",
        value: "Normal",
      },
      {
        id: "2",
        type: "Cholesterol Panel",
        date: "2024-01-10",
        status: "warning",
        value: "Elevated",
      },
    ],
    medications: [
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        refills: 2,
        nextRefill: "2024-02-01",
      },
      {
        id: "2",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        refills: 1,
        nextRefill: "2024-01-25",
      },
    ],
    healthMetrics: {
      bloodPressure: { systolic: 120, diastolic: 80, trend: "stable" },
      heartRate: { value: 72, trend: "normal" },
      weight: { value: 165, trend: "decreasing" },
      bloodSugar: { value: 95, trend: "stable" },
    },
    recentMessages: [
      {
        id: "1",
        from: "Dr. Johnson",
        subject: "Test Results Available",
        date: "2024-01-11",
        unread: true,
      },
      {
        id: "2",
        from: "Pharmacy",
        subject: "Prescription Ready",
        date: "2024-01-10",
        unread: false,
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
      default:
        return "default";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp color="error" />;
      case "decreasing":
        return <TrendingDown color="success" />;
      case "stable":
        return <CheckCircle color="success" />;
      default:
        return null;
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
          <StatCard
            title="Next Appointment"
            value={mockData.nextAppointment.date}
            icon={<Event />}
            color="primary"
            onClick={() => navigate("/patient-portal/appointments")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Medications"
            value={mockData.medications.length.toString()}
            icon={<Medication />}
            color="secondary"
            onClick={() => navigate("/patient-portal/prescriptions")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Recent Results"
            value={mockData.recentResults.length.toString()}
            icon={<Science />}
            color="info"
            onClick={() => navigate("/patient-portal/lab-results")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unread Messages"
            value={mockData.recentMessages
              .filter((m) => m.unread)
              .length.toString()}
            icon={<Message />}
            color="warning"
            onClick={() => navigate("/patient-portal/messages")}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Next Appointment */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Next Appointment</Typography>
              </Box>
              {mockData.nextAppointment ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {mockData.nextAppointment.provider}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {mockData.nextAppointment.specialty}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}>
                    <Typography variant="body1">
                      {new Date(
                        mockData.nextAppointment.date
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {mockData.nextAppointment.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={mockData.nextAppointment.type}
                    color="primary"
                    variant="outlined"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Phone />}
                      onClick={() => navigate("/patient-portal/appointments")}>
                      Manage Appointments
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Typography color="text.secondary">
                  No upcoming appointments
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Health Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {mockData.healthMetrics.bloodPressure.systolic}/
                      {mockData.healthMetrics.bloodPressure.diastolic}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blood Pressure (mmHg)
                    </Typography>
                    {getTrendIcon(mockData.healthMetrics.bloodPressure.trend)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="secondary">
                      {mockData.healthMetrics.heartRate.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Heart Rate (bpm)
                    </Typography>
                    {getTrendIcon(mockData.healthMetrics.heartRate.trend)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="info.main">
                      {mockData.healthMetrics.weight.value} lbs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Weight
                    </Typography>
                    {getTrendIcon(mockData.healthMetrics.weight.trend)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="warning.main">
                      {mockData.healthMetrics.bloodSugar.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blood Sugar (mg/dL)
                    </Typography>
                    {getTrendIcon(mockData.healthMetrics.bloodSugar.trend)}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Lab Results */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Lab Results
              </Typography>
              <List>
                {mockData.recentResults.map((result, index) => (
                  <React.Fragment key={result.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: `${getStatusColor(result.status)}.main`,
                          }}>
                          <Science />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={result.type}
                        secondary={`${result.date} - ${result.value}`}
                      />
                      <Chip
                        label={result.status}
                        color={getStatusColor(result.status) as any}
                        size="small"
                      />
                    </ListItem>
                    {index < mockData.recentResults.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/patient-portal/lab-results")}>
                View All Results
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Medications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Medications
              </Typography>
              <List>
                {mockData.medications.map((med, index) => (
                  <React.Fragment key={med.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                          <Medication />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={med.name}
                        secondary={`${med.dosage} - ${med.frequency}`}
                      />
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" color="text.secondary">
                          {med.refills} refills left
                        </Typography>
                        <Chip
                          label={
                            new Date(med.nextRefill) < new Date()
                              ? "Refill Due"
                              : "Active"
                          }
                          color={
                            new Date(med.nextRefill) < new Date()
                              ? "warning"
                              : "success"
                          }
                          size="small"
                        />
                      </Box>
                    </ListItem>
                    {index < mockData.medications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/patient-portal/prescriptions")}>
                Manage Medications
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Messages */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Messages
              </Typography>
              <List>
                {mockData.recentMessages.map((message, index) => (
                  <React.Fragment key={message.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: message.unread
                              ? "primary.main"
                              : "grey.300",
                          }}>
                          <Message />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            {message.subject}
                            {message.unread && (
                              <Chip label="New" color="primary" size="small" />
                            )}
                          </Box>
                        }
                        secondary={`From: ${message.from} - ${message.date}`}
                      />
                      <IconButton size="small">
                        <Message />
                      </IconButton>
                    </ListItem>
                    {index < mockData.recentMessages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/patient-portal/messages")}>
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
