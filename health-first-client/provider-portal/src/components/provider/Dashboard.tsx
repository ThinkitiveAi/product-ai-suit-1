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
  IconButton,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  People,
  Event,
  Schedule,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Person,
  Phone,
  Message,
  LocalHospital,
  Receipt,
  Science,
  Medication,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import StatCard from "../ui/StatCard";

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Mock data - in real app, this would come from API
  const mockData = {
    todayStats: {
      appointments: 12,
      patients: 8,
      urgentCases: 2,
      revenue: 2400,
    },
    todaySchedule: [
      {
        id: "1",
        time: "09:00 AM",
        patient: "John Smith",
        type: "Follow-up",
        status: "confirmed",
      },
      {
        id: "2",
        time: "10:30 AM",
        patient: "Sarah Johnson",
        type: "New Patient",
        status: "confirmed",
      },
      {
        id: "3",
        time: "02:00 PM",
        patient: "Mike Wilson",
        type: "Urgent",
        status: "pending",
      },
    ],
    recentPatients: [
      {
        id: "1",
        name: "John Smith",
        lastVisit: "2024-01-10",
        nextAppointment: "2024-01-15",
        status: "active",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        lastVisit: "2024-01-09",
        nextAppointment: "2024-01-20",
        status: "active",
      },
      {
        id: "3",
        name: "Mike Wilson",
        lastVisit: "2024-01-08",
        nextAppointment: "2024-01-12",
        status: "urgent",
      },
    ],
    pendingTasks: [
      {
        id: "1",
        type: "Lab Results",
        patient: "John Smith",
        priority: "high",
        dueDate: "2024-01-12",
      },
      {
        id: "2",
        type: "Prescription Refill",
        patient: "Sarah Johnson",
        priority: "medium",
        dueDate: "2024-01-14",
      },
      {
        id: "3",
        type: "Follow-up Call",
        patient: "Mike Wilson",
        priority: "high",
        dueDate: "2024-01-11",
      },
    ],
    recentMessages: [
      {
        id: "1",
        from: "John Smith",
        subject: "Test Results Question",
        date: "2024-01-11",
        unread: true,
      },
      {
        id: "2",
        from: "Sarah Johnson",
        subject: "Appointment Reschedule",
        date: "2024-01-10",
        unread: false,
      },
    ],
    monthlyStats: {
      totalPatients: 156,
      totalAppointments: 89,
      totalRevenue: 15600,
      growthRate: 12.5,
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "urgent":
        return "error";
      case "active":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
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
          Here's your daily overview
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Appointments"
            value={mockData.todayStats.appointments}
            icon={<Event />}
            color="primary"
            onClick={() => navigate("/provider-portal/appointments")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Patients"
            value={mockData.monthlyStats.totalPatients}
            icon={<People />}
            color="secondary"
            onClick={() => navigate("/provider-portal/patients")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Urgent Cases"
            value={mockData.todayStats.urgentCases}
            icon={<Warning />}
            color="error"
            onClick={() => navigate("/provider-portal/appointments")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Revenue"
            value={`$${mockData.monthlyStats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUp />}
            color="success"
            onClick={() => navigate("/provider-portal/billing")}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Today's Schedule</Typography>
              </Box>
              <List>
                {mockData.todaySchedule.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: `${getStatusColor(
                              appointment.status
                            )}.main`,
                          }}>
                          <Person />
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
                            {appointment.patient}
                            <Chip
                              label={appointment.type}
                              color={getStatusColor(appointment.status) as any}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={appointment.time}
                      />
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                    </ListItem>
                    {index < mockData.todaySchedule.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/provider-portal/schedule")}>
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Tasks
              </Typography>
              <List>
                {mockData.pendingTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: `${getPriorityColor(task.priority)}.main`,
                          }}>
                          {task.type === "Lab Results" && <Science />}
                          {task.type === "Prescription Refill" && (
                            <Medication />
                          )}
                          {task.type === "Follow-up Call" && <Phone />}
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
                            {task.type}
                            <Chip
                              label={task.priority}
                              color={getPriorityColor(task.priority) as any}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={`${task.patient} - Due: ${task.dueDate}`}
                      />
                      <IconButton size="small">
                        <CheckCircle />
                      </IconButton>
                    </ListItem>
                    {index < mockData.pendingTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/provider-portal/appointments")}>
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Patients
              </Typography>
              <List>
                {mockData.recentPatients.map((patient, index) => (
                  <React.Fragment key={patient.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: `${getStatusColor(patient.status)}.main`,
                          }}>
                          <Person />
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
                            {patient.name}
                            <Chip
                              label={patient.status}
                              color={getStatusColor(patient.status) as any}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={`Last: ${patient.lastVisit} | Next: ${patient.nextAppointment}`}
                      />
                      <IconButton size="small">
                        <Person />
                      </IconButton>
                    </ListItem>
                    {index < mockData.recentPatients.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/provider-portal/patients")}>
                View All Patients
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Messages */}
        <Grid item xs={12} md={6}>
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
                onClick={() => navigate("/provider-portal/messages")}>
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Performance
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {mockData.monthlyStats.totalPatients}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Patients
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="secondary">
                      {mockData.monthlyStats.totalAppointments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Appointments
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="success.main">
                      ${mockData.monthlyStats.totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Revenue
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="info.main">
                      +{mockData.monthlyStats.growthRate}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Growth Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderDashboard;
