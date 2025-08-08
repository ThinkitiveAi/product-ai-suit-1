import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight, BookOnline } from "@mui/icons-material";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  SlotInfo,
  Event,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface AvailableSlot {
  id: string;
  date: Date;
  slotsAvailable: number;
  provider: string;
  appointmentMode: string;
  location: string;
  visitType: string;
  estimatedAmount: string;
}

interface PatientAvailabilityCalendarProps {
  onBookAppointment?: (slot: AvailableSlot) => void;
}

const PatientAvailabilityCalendar: React.FC<
  PatientAvailabilityCalendarProps
> = ({ onBookAppointment }) => {
  const [selectedProvider, setSelectedProvider] = useState("All Providers");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedVisitType, setSelectedVisitType] = useState("All Types");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025

  // Mock available slots data
  const availableSlots: AvailableSlot[] = useMemo(
    () => [
      {
        id: "1",
        date: new Date(2025, 7, 11), // August 11, 2025
        slotsAvailable: 1,
        provider: "Dr. Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
        estimatedAmount: "$150",
      },
      {
        id: "2",
        date: new Date(2025, 7, 18), // August 18, 2025
        slotsAvailable: 2,
        provider: "Dr. Smith",
        appointmentMode: "In-Person",
        location: "Main Clinic",
        visitType: "New Patient",
        estimatedAmount: "$200",
      },
      {
        id: "3",
        date: new Date(2025, 7, 19), // August 19, 2025
        slotsAvailable: 6,
        provider: "Dr. Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
        estimatedAmount: "$150",
      },
      {
        id: "4",
        date: new Date(2025, 7, 20), // August 20, 2025
        slotsAvailable: 2,
        provider: "Dr. Johnson",
        appointmentMode: "In-Person",
        location: "Downtown Office",
        visitType: "Consultation",
        estimatedAmount: "$180",
      },
    ],
    []
  );

  // Filter slots based on selections
  const filteredSlots = useMemo(() => {
    return availableSlots.filter((slot) => {
      const providerMatch =
        selectedProvider === "All Providers" ||
        slot.provider === selectedProvider;
      const modeMatch =
        selectedMode === "All Modes" || slot.appointmentMode === selectedMode;
      const locationMatch =
        selectedLocation === "All Locations" ||
        slot.location === selectedLocation;
      const typeMatch =
        selectedVisitType === "All Types" ||
        slot.visitType === selectedVisitType;

      return providerMatch && modeMatch && locationMatch && typeMatch;
    });
  }, [
    availableSlots,
    selectedProvider,
    selectedMode,
    selectedLocation,
    selectedVisitType,
  ]);

  // Convert available slots to calendar events
  const events: Event[] = useMemo(() => {
    return filteredSlots.map((slot) => ({
      id: slot.id,
      title: `${slot.slotsAvailable} Slots - ${slot.provider}`,
      start: slot.date,
      end: slot.date,
      resource: slot,
    }));
  }, [filteredSlots]);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log("Selected slot:", slotInfo);
    // Handle slot selection for booking
  };

  const handleSelectEvent = (event: Event) => {
    const slot = event.resource as AvailableSlot;
    console.log("Selected event:", slot);
    if (onBookAppointment) {
      onBookAppointment(slot);
    }
  };

  const eventStyleGetter = (event: Event) => {
    const slot = event.resource as AvailableSlot;
    return {
      style: {
        backgroundColor: "#e8f5e8",
        border: "1px solid #4caf50",
        borderRadius: "4px",
        color: "#2e7d32",
        fontSize: "12px",
        fontWeight: "bold",
        padding: "2px 4px",
        cursor: "pointer",
      },
    };
  };

  const CustomToolbar = ({ label, onNavigate }: any) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}>
      <Typography variant="h6" fontWeight="bold">
        Available Appointments
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => onNavigate("PREV")}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">{label}</Typography>
        <IconButton onClick={() => onNavigate("NEXT")}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header with filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          bgcolor: "white",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Provider Selection */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              displayEmpty>
              <MenuItem value="All Providers">All Providers</MenuItem>
              <MenuItem value="Dr. Julie Mark">Dr. Julie Mark</MenuItem>
              <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
              <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
            </Select>
          </FormControl>

          {/* Appointment Mode */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              displayEmpty>
              <MenuItem value="All Modes">All Modes</MenuItem>
              <MenuItem value="Telehealth">Telehealth</MenuItem>
              <MenuItem value="In-Person">In-Person</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
            </Select>
          </FormControl>

          {/* Location */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              displayEmpty>
              <MenuItem value="All Locations">All Locations</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
              <MenuItem value="Main Clinic">Main Clinic</MenuItem>
              <MenuItem value="Downtown Office">Downtown Office</MenuItem>
            </Select>
          </FormControl>

          {/* Visit Type */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedVisitType}
              onChange={(e) => setSelectedVisitType(e.target.value)}
              displayEmpty>
              <MenuItem value="All Types">All Types</MenuItem>
              <MenuItem value="Follow-Up Visit">Follow-Up Visit</MenuItem>
              <MenuItem value="New Patient">New Patient</MenuItem>
              <MenuItem value="Consultation">Consultation</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Book Appointment Button */}
        <Button
          variant="contained"
          startIcon={<BookOnline />}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#388e3c" },
          }}>
          Book Appointment
        </Button>
      </Box>

      {/* Calendar */}
      <Paper sx={{ p: 2 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={Views.MONTH}
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
          messages={{
            next: "Next",
            previous: "Previous",
            today: "Today",
            month: "Month",
            noEventsInRange: "No available appointments in this range.",
          }}
        />
      </Paper>

      {/* Legend */}
      <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Legend:
        </Typography>
        <Chip
          label="Available Slots"
          size="small"
          sx={{
            bgcolor: "#e8f5e8",
            color: "#2e7d32",
            border: "1px solid #4caf50",
          }}
        />
      </Box>
    </Box>
  );
};

export default PatientAvailabilityCalendar;
