import { Add, Edit, PlayArrow, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BookAppointmentModal from "./BookAppointmentModal";

interface Appointment {
  id: string;
  dateTime: string;
  appointmentType: string;
  patientName: string;
  patientGender: string;
  dateOfBirth: string;
  age: number;
  contactDetails: string;
  providerName: string;
  reasonForVisit: string;
  status: "scheduled" | "checked-in" | "in-exam" | "cancelled" | "completed";
}

const AppointmentList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);

  // Mock data - replace with actual API call
  const appointments: Appointment[] = [
    {
      id: "1",
      dateTime: "02/24/21, 11:17am",
      appointmentType: "New",
      patientName: "Heena West",
      patientGender: "F",
      dateOfBirth: "10-21-1959",
      age: 65,
      contactDetails: "202-555-0188",
      providerName: "Jacob Jones",
      reasonForVisit: "Infection Disease",
      status: "scheduled",
    },
    {
      id: "2",
      dateTime: "02/26/21, 9:40pm",
      appointmentType: "Follow Up",
      patientName: "Arlene McCoy",
      patientGender: "M",
      dateOfBirth: "05-15-1982",
      age: 42,
      contactDetails: "202-555-0123",
      providerName: "Bessie Cooper",
      reasonForVisit: "Itching",
      status: "checked-in",
    },
    {
      id: "3",
      dateTime: "03/01/21, 6:05am",
      appointmentType: "New",
      patientName: "Jane Cooper",
      patientGender: "F",
      dateOfBirth: "12-03-1975",
      age: 49,
      contactDetails: "202-555-0456",
      providerName: "Dr. Smith",
      reasonForVisit: "Blurred Vision",
      status: "cancelled",
    },
    {
      id: "4",
      dateTime: "02/26/21, 9:40pm",
      appointmentType: "Follow Up",
      patientName: "Bessie Cooper",
      patientGender: "M",
      dateOfBirth: "08-20-1968",
      age: 56,
      contactDetails: "202-555-0789",
      providerName: "Dr. Johnson",
      reasonForVisit: "Stomach Pain",
      status: "in-exam",
    },
  ];

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
      case "in-exam":
        return "primary";
      case "checked-in":
        return "secondary";
      case "cancelled":
        return "error";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "checked-in":
        return "Checked In";
      case "in-exam":
        return "In Exam";
      case "cancelled":
        return "Cancelled";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStartAppointment = (appointmentId: string) => {
    console.log("Starting appointment:", appointmentId);
    // Implement appointment start logic
  };

  const handleEditAppointment = (appointmentId: string) => {
    console.log("Editing appointment:", appointmentId);
    // Implement appointment edit logic
  };

  const handleOpenBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(true);
  };

  const handleCloseBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(false);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.providerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.reasonForVisit
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedAppointments = filteredAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          bgcolor: "white",
          borderRadius: 1,
        }}>
        <Typography variant="h6" fontWeight="bold">
          Appointment List
        </Typography>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "white" }}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Notifications />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <AccountCircle />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Code />
          </IconButton>
        </Box> */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenBookAppointmentModal}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
          }}>
          Book Appointment
        </Button>
      </Box>

      {/* Search and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <TextField
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Appointment Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Appointment Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Patient Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Contact Details
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Provider Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reason for Visit
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAppointments.map((appointment) => (
                <TableRow key={appointment.id} hover>
                  <TableCell>{appointment.dateTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.appointmentType}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {appointment.patientName} ({appointment.patientGender})
                  </TableCell>
                  <TableCell>
                    {appointment.dateOfBirth} ({appointment.age})
                  </TableCell>
                  <TableCell>{appointment.contactDetails}</TableCell>
                  <TableCell>{appointment.providerName}</TableCell>
                  <TableCell>{appointment.reasonForVisit}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(appointment.status)}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PlayArrow />}
                        onClick={() => handleStartAppointment(appointment.id)}
                        disabled={appointment.status === "cancelled"}>
                        Start
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleEditAppointment(appointment.id)}>
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        open={isBookAppointmentModalOpen}
        onClose={handleCloseBookAppointmentModal}
      />
    </Box>
  );
};

export default AppointmentList;
