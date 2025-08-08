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
import { ChevronLeft, ChevronRight, Edit } from "@mui/icons-material";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  SlotInfo,
  Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AvailabilityCalendar.css";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface AvailabilitySlot {
  id: string;
  date: Date;
  slotsAvailable: number;
  provider: string;
  appointmentMode: string;
  location: string;
  visitType: string;
}

interface AvailabilityCalendarProps {
  onEditAvailability?: () => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  onEditAvailability,
}) => {
  const [selectedProvider, setSelectedProvider] = useState("Julie Mark");
  const [selectedMode, setSelectedMode] = useState("Telehealth");
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [selectedVisitType, setSelectedVisitType] = useState("Follow-Up Visit");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025

  // Mock availability data
  const availabilitySlots: AvailabilitySlot[] = useMemo(
    () => [
      {
        id: "1",
        date: new Date(2025, 7, 11), // August 11, 2025
        slotsAvailable: 1,
        provider: "Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
      },
      {
        id: "2",
        date: new Date(2025, 7, 18), // August 18, 2025
        slotsAvailable: 2,
        provider: "Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
      },
      {
        id: "3",
        date: new Date(2025, 7, 19), // August 19, 2025
        slotsAvailable: 6,
        provider: "Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
      },
      {
        id: "4",
        date: new Date(2025, 7, 20), // August 20, 2025
        slotsAvailable: 2,
        provider: "Julie Mark",
        appointmentMode: "Telehealth",
        location: "Virtual",
        visitType: "Follow-Up Visit",
      },
    ],
    []
  );

  // Convert availability slots to calendar events
  const events: Event[] = useMemo(() => {
    return availabilitySlots.map((slot) => ({
      id: slot.id,
      title: `${slot.slotsAvailable} Slots Available`,
      start: slot.date,
      end: slot.date,
      resource: slot,
    }));
  }, [availabilitySlots]);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log("Selected slot:", slotInfo);
    // Handle slot selection for booking
  };

  const handleSelectEvent = (event: Event) => {
    console.log("Selected event:", event);
    // Handle event selection
  };

  const eventStyleGetter = (event: Event) => {
    const slot = event.resource as AvailabilitySlot;
    return {
      style: {
        backgroundColor: "#e3f2fd",
        border: "1px solid #1976d2",
        borderRadius: "4px",
        color: "#1976d2",
        fontSize: "12px",
        fontWeight: "bold",
        padding: "2px 4px",
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
        Availability
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
              <MenuItem value="Julie Mark">Julie Mark</MenuItem>
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
              displayEmpty
              disabled={selectedMode === "Telehealth"}>
              <MenuItem value="Select Location">Select Location</MenuItem>
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
              <MenuItem value="Follow-Up Visit">Follow-Up Visit</MenuItem>
              <MenuItem value="New Patient">New Patient</MenuItem>
              <MenuItem value="Consultation">Consultation</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Edit Availability Button */}
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={onEditAvailability}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
          }}>
          Edit Availability
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
            noEventsInRange: "No availability slots in this range.",
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
            bgcolor: "#e3f2fd",
            color: "#1976d2",
            border: "1px solid #1976d2",
          }}
        />
      </Box>
    </Box>
  );
};

export default AvailabilityCalendar;
