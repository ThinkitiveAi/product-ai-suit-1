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
import { Event, Add, Person, Schedule } from "@mui/icons-material";

const ProviderAppointments: React.FC = () => {
  const appointments = [
    {
      id: "1",
      patient: "John Smith",
      time: "09:00 AM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      time: "10:30 AM",
      type: "New Patient",
      status: "confirmed",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Schedule
              </Typography>
              <List>
                {appointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={appointment.patient}
                      secondary={`${appointment.time} - ${appointment.type}`}
                    />
                    <Chip label={appointment.status} color="primary" />
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
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderAppointments;
