import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import BookAppointmentModal from "../../components/BookAppointmentModal";
import PatientAppointmentList from "../../components/PatientAppointmentList";
import PatientAvailabilityCalendar from "../../components/PatientAvailabilityCalendar";

const PatientAppointments: React.FC = () => {
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
          <Tab label="My Appointments" />
          <Tab label="Available Appointments" />
          <Tab label="Quick Actions" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <PatientAppointmentList />}

      {activeTab === 1 && (
        <PatientAvailabilityCalendar
          onBookAppointment={(slot) => {
            console.log("Booking appointment for slot:", slot);
            handleOpenBookAppointmentModal();
          }}
        />
      )}

      {activeTab === 2 && (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 600px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Appointments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No appointments scheduled yet. Book your first appointment to
                  get started!
                </Typography>
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
                  variant="contained"
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

export default PatientAppointments;
