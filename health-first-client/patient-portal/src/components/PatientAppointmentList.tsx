import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, PlayArrow, Edit, Cancel, Add } from "@mui/icons-material";
import BookAppointmentModal from "./BookAppointmentModal";

interface PatientAppointment {
  id: string;
  dateTime: string;
  appointmentType: string;
  providerName: string;
  reasonForVisit: string;
  status: "scheduled" | "confirmed" | "cancelled" | "completed";
  estimatedAmount: string;
}

const PatientAppointmentList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);

  // Mock data - replace with actual API call
  const appointments: PatientAppointment[] = [
    {
      id: "1",
      dateTime: "02/24/21, 11:17am",
      appointmentType: "New",
      providerName: "Dr. Jacob Jones",
      reasonForVisit: "Annual Checkup",
      status: "scheduled",
      estimatedAmount: "$150",
    },
    {
      id: "2",
      dateTime: "02/26/21, 9:40pm",
      appointmentType: "Follow Up",
      providerName: "Dr. Bessie Cooper",
      reasonForVisit: "Follow-up Consultation",
      status: "confirmed",
      estimatedAmount: "$100",
    },
    {
      id: "3",
      dateTime: "03/01/21, 6:05am",
      appointmentType: "New",
      providerName: "Dr. Smith",
      reasonForVisit: "Eye Examination",
      status: "cancelled",
      estimatedAmount: "$200",
    },
  ];

  const getStatusColor = (status: PatientAppointment["status"]) => {
    switch (status) {
      case "scheduled":
      case "confirmed":
        return "primary";
      case "cancelled":
        return "error";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: PatientAppointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "confirmed":
        return "Confirmed";
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

  const handleJoinAppointment = (appointmentId: string) => {
    console.log("Joining appointment:", appointmentId);
    // Implement appointment join logic
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    console.log("Rescheduling appointment:", appointmentId);
    // Implement appointment reschedule logic
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log("Cancelling appointment:", appointmentId);
    // Implement appointment cancellation logic
  };

  const handleOpenBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(true);
  };

  const handleCloseBookAppointmentModal = () => {
    setIsBookAppointmentModalOpen(false);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.providerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.reasonForVisit
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.appointmentType
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedAppointments = filteredAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Search and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <TextField
          placeholder="Search my appointments..."
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
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenBookAppointmentModal}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
          }}>
          Book New Appointment
        </Button>
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
                <TableCell sx={{ fontWeight: "bold" }}>Provider</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reason for Visit
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Estimated Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                  <TableCell>{appointment.providerName}</TableCell>
                  <TableCell>{appointment.reasonForVisit}</TableCell>
                  <TableCell>{appointment.estimatedAmount}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(appointment.status)}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {appointment.status === "scheduled" ||
                      appointment.status === "confirmed" ? (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<PlayArrow />}
                            onClick={() =>
                              handleJoinAppointment(appointment.id)
                            }>
                            Join
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Edit />}
                            onClick={() =>
                              handleRescheduleAppointment(appointment.id)
                            }>
                            Reschedule
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() =>
                              handleCancelAppointment(appointment.id)
                            }>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No actions available
                        </Typography>
                      )}
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

export default PatientAppointmentList;
