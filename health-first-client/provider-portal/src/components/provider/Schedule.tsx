import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { Schedule, Event, Add, Settings } from "@mui/icons-material";
import DayWiseAvailabilityModal from "./DayWiseAvailabilityModal";
import BookAppointmentModal from "./BookAppointmentModal";
import AvailabilityCalendar from "./AvailabilityCalendar";

const ProviderSchedule: React.FC = () => {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenAvailabilityModal = () => {
    setIsAvailabilityModalOpen(true);
  };

  const handleCloseAvailabilityModal = () => {
    setIsAvailabilityModalOpen(false);
  };

  const handleOpenBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(true);
  };

  const handleCloseBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditAvailability = () => {
    setIsAvailabilityModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Availability Calendar" />
          <Tab label="Quick Actions" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <AvailabilityCalendar onEditAvailability={handleEditAvailability} />
      )}

      {activeTab === 1 && (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 600px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Add />}
                  onClick={handleOpenBookAppointmentModal}
                  sx={{ mb: 2 }}>
                  Book Appointment
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Settings />}
                  onClick={handleOpenAvailabilityModal}>
                  Set Availability
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      {/* Day Wise Availability Modal */}
      <DayWiseAvailabilityModal
        open={isAvailabilityModalOpen}
        onClose={handleCloseAvailabilityModal}
      />

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        open={isBookAppointmentModalOpen}
        onClose={handleCloseBookAppointmentModal}
      />
    </Box>
  );
};

export default ProviderSchedule;
