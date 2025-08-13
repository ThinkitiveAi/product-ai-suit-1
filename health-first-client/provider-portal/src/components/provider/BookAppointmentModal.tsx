import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
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

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Provider {
  id: string;
  name: string;
  specialty: string;
  email: string;
}

interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  basePrice: number;
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

  // Mock data - replace with API calls
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "555-0101",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "555-0102",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "555-0103",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "555-0104",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "555-0105",
    },
  ]);

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Dr. Julie Mark",
      specialty: "Internal Medicine",
      email: "julie.mark@clinic.com",
    },
    {
      id: "2",
      name: "Dr. Smith",
      specialty: "Cardiology",
      email: "smith@clinic.com",
    },
    {
      id: "3",
      name: "Dr. Johnson",
      specialty: "Dermatology",
      email: "johnson@clinic.com",
    },
    {
      id: "4",
      name: "Dr. Williams",
      specialty: "Pediatrics",
      email: "williams@clinic.com",
    },
  ]);

  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([
    { id: "1", name: "New Patient Visit", duration: 60, basePrice: 200 },
    { id: "2", name: "Follow-up Visit", duration: 30, basePrice: 150 },
    { id: "3", name: "Consultation", duration: 45, basePrice: 180 },
    { id: "4", name: "Emergency Visit", duration: 90, basePrice: 300 },
    { id: "5", name: "Annual Checkup", duration: 45, basePrice: 175 },
  ]);

  // Load data when component mounts
  useEffect(() => {
    // TODO: Replace with actual API calls
    // loadPatients();
    // loadProviders();
    // loadAppointmentTypes();
  }, []);

  // API integration functions (to be implemented)
  const loadPatients = async () => {
    try {
      // const response = await fetch('/api/patients');
      // const data = await response.json();
      // setPatients(data);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  const loadProviders = async () => {
    try {
      // const response = await fetch('/api/providers');
      // const data = await response.json();
      // setProviders(data);
    } catch (error) {
      console.error("Error loading providers:", error);
    }
  };

  const loadAppointmentTypes = async () => {
    try {
      // const response = await fetch('/api/appointment-types');
      // const data = await response.json();
      // setAppointmentTypes(data);
    } catch (error) {
      console.error("Error loading appointment types:", error);
    }
  };

  const createAppointment = async (appointmentData: any) => {
    try {
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(appointmentData),
      // });
      // const data = await response.json();
      // console.log('Appointment created:', data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleInputChange = (
    field: keyof AppointmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePatientChange = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    setFormData((prev) => ({
      ...prev,
      patientName: patient ? patient.name : "",
    }));
  };

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find((p) => p.id === providerId);
    setFormData((prev) => ({
      ...prev,
      provider: provider ? provider.name : "",
    }));
  };

  const handleAppointmentTypeChange = (typeId: string) => {
    const appointmentType = appointmentTypes.find((t) => t.id === typeId);
    setFormData((prev) => ({
      ...prev,
      appointmentType: appointmentType ? appointmentType.name : "",
      estimatedAmount: appointmentType
        ? appointmentType.basePrice.toString()
        : "",
    }));
  };

  const handleSubmit = () => {
    // Get the actual IDs for API submission
    const patientId = patients.find((p) => p.name === formData.patientName)?.id;
    const providerId = providers.find((p) => p.name === formData.provider)?.id;
    const appointmentTypeId = appointmentTypes.find(
      (t) => t.name === formData.appointmentType
    )?.id;

    const appointmentData = {
      ...formData,
      patientId,
      providerId,
      appointmentTypeId,
    };

    // Handle form submission here
    console.log("Appointment data for API:", appointmentData);

    // TODO: Make API call to create appointment
    // createAppointment(appointmentData);

    onClose();
  };

  // Form validation
  const isFormValid = () => {
    return (
      formData.patientName &&
      formData.provider &&
      formData.appointmentType &&
      formData.dateTime &&
      formData.reasonForVisit
    );
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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="patient-select-label">Patient Name</InputLabel>
            <Select
              labelId="patient-select-label"
              value={
                patients.find((p) => p.name === formData.patientName)?.id || ""
              }
              label="Patient Name"
              onChange={(e) => handlePatientChange(e.target.value)}>
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  <Box>
                    <Typography variant="body1">{patient.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {patient.email} • {patient.phone}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="provider-select-label">Provider</InputLabel>
            <Select
              labelId="provider-select-label"
              value={
                providers.find((p) => p.name === formData.provider)?.id || ""
              }
              label="Provider"
              onChange={(e) => handleProviderChange(e.target.value)}>
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  <Box>
                    <Typography variant="body1">{provider.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {provider.specialty}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Appointment Type */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="appointment-type-select-label">
              Appointment Type
            </InputLabel>
            <Select
              labelId="appointment-type-select-label"
              value={
                appointmentTypes.find(
                  (t) => t.name === formData.appointmentType
                )?.id || ""
              }
              label="Appointment Type"
              onChange={(e) => handleAppointmentTypeChange(e.target.value)}>
              {appointmentTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}>
                    <Typography variant="body1">{type.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {type.duration}min • ${type.basePrice}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              disabled={!isFormValid()}
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                px: 3,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#1565c0",
                },
                "&:disabled": {
                  bgcolor: "#ccc",
                  color: "#666",
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
