import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  Close,
  Search,
  CalendarToday,
  KeyboardArrowDown,
} from "@mui/icons-material";

interface BookAppointmentModalProps {
  open: boolean;
  onClose: () => void;
}

interface AppointmentFormData {
  patientName: string;
  appointmentMode: "in-person" | "video-call" | "home";
  provider: string;
  appointmentType: string;
  estimatedAmount: string;
  dateTime: string;
  reasonForVisit: string;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "",
    appointmentMode: "in-person",
    provider: "",
    appointmentType: "",
    estimatedAmount: "",
    dateTime: "",
    reasonForVisit: "",
  });

  const handleInputChange = (
    field: keyof AppointmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Appointment data:", formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: "1px solid #1976d2",
        },
      }}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}>
        <Typography variant="h6" fontWeight="bold">
          Schedule New Appointment
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "grey.600",
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Box component="form" sx={{ mt: 2 }}>
          {/* Patient Name */}
          <TextField
            fullWidth
            label="Patient Name"
            placeholder="Search & Select Patient"
            value={formData.patientName}
            onChange={(e) => handleInputChange("patientName", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyboardArrowDown />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Appointment Mode */}
          <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: "bold" }}>
              Appointment Mode
            </FormLabel>
            <RadioGroup
              row
              value={formData.appointmentMode}
              onChange={(e) =>
                handleInputChange("appointmentMode", e.target.value)
              }>
              <FormControlLabel
                value="in-person"
                control={<Radio />}
                label="In-Person"
              />
              <FormControlLabel
                value="video-call"
                control={<Radio />}
                label="Video Call"
              />
              <FormControlLabel value="home" control={<Radio />} label="Home" />
            </RadioGroup>
          </FormControl>

          {/* Provider */}
          <TextField
            fullWidth
            label="Provider"
            placeholder="Search Provider"
            value={formData.provider}
            onChange={(e) => handleInputChange("provider", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyboardArrowDown />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Appointment Type */}
          <TextField
            fullWidth
            label="Appointment Type"
            placeholder="Select Type"
            value={formData.appointmentType}
            onChange={(e) =>
              handleInputChange("appointmentType", e.target.value)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyboardArrowDown />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Estimated Amount */}
          <TextField
            fullWidth
            label="Estimated Amount ($)"
            placeholder="Enter Amount"
            type="number"
            value={formData.estimatedAmount}
            onChange={(e) =>
              handleInputChange("estimatedAmount", e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Date & Time */}
          <TextField
            fullWidth
            label="Date & Time"
            placeholder="Choose Date"
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => handleInputChange("dateTime", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />

          {/* Reason for Visit */}
          <TextField
            fullWidth
            label="Reason for Visit"
            placeholder="Enter Reason"
            multiline
            rows={4}
            value={formData.reasonForVisit}
            onChange={(e) =>
              handleInputChange("reasonForVisit", e.target.value)
            }
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                px: 3,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}>
              Save & Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
