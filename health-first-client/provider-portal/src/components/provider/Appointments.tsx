import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import { Event, Add, Person, Schedule } from "@mui/icons-material";
import BookAppointmentModal from "./BookAppointmentModal";
import AppointmentList from "./AppointmentList";

const ProviderAppointments: React.FC = () => {
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(true);
  };

  const handleCloseBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Appointment List" />
          <Tab label="Today's Schedule" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <AppointmentList />}

      {activeTab === 1 && (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 600px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today's Schedule
                </Typography>
                <List>
                  {[
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
                  ].map((appointment) => (
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
          </Box>
          <Box sx={{ flex: "0 1 300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Add />}
                  onClick={handleOpenBookAppointmentModal}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        open={isBookAppointmentModalOpen}
        onClose={handleCloseBookAppointmentModal}
      />
    </Box>
  );
};

export default ProviderAppointments;
