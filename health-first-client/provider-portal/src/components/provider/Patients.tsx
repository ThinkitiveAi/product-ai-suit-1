import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Search,
  Add,
  Edit,
  Person,
  Phone,
  Email,
  Message,
  Event,
  Science,
  Medication,
  FilterList,
} from "@mui/icons-material";

const ProviderPatients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock data
  const patients = [
    {
      id: "1",
      name: "John Smith",
      age: 45,
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-15",
      status: "active",
      primaryCare: "Dr. Sarah Johnson",
      conditions: ["Hypertension", "Diabetes"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 32,
      email: "sarah.johnson@email.com",
      phone: "+1-555-0124",
      lastVisit: "2024-01-09",
      nextAppointment: "2024-01-20",
      status: "active",
      primaryCare: "Dr. Michael Chen",
      conditions: ["Asthma"],
    },
    {
      id: "3",
      name: "Mike Wilson",
      age: 58,
      email: "mike.wilson@email.com",
      phone: "+1-555-0125",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-12",
      status: "urgent",
      primaryCare: "Dr. Sarah Johnson",
      conditions: ["Heart Disease", "High Cholesterol"],
    },
    {
      id: "4",
      name: "Emily Davis",
      age: 28,
      email: "emily.davis@email.com",
      phone: "+1-555-0126",
      lastVisit: "2024-01-07",
      nextAppointment: null,
      status: "inactive",
      primaryCare: "Dr. Michael Chen",
      conditions: [],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "urgent":
        return "error";
      case "inactive":
        return "default";
      default:
        return "default";
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleOpenDialog = (patient?: any) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}>
        <Typography variant="h4">Patient Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}>
          Add Patient
        </Button>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search patients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status Filter">
                  <MenuItem value="all">All Patients</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="outlined" startIcon={<FilterList />} fullWidth>
                Advanced Filter
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Patient Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary">
                {patients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main">
                {patients.filter((p) => p.status === "active").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="error.main">
                {patients.filter((p) => p.status === "urgent").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Urgent Cases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main">
                {patients.filter((p) => p.nextAppointment).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Patient Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Next Appointment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Conditions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {patient.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Age: {patient.age} | {patient.primaryCare}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{patient.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {patient.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {patient.lastVisit
                        ? new Date(patient.lastVisit).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {patient.nextAppointment
                        ? new Date(patient.nextAppointment).toLocaleDateString()
                        : "No upcoming"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.status}
                        color={getStatusColor(patient.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {patient.conditions.map((condition, index) => (
                          <Chip
                            key={index}
                            label={condition}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Person />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Event />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Message />
                        </IconButton>
                        <IconButton size="small" color="warning">
                          <Edit />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth>
        <DialogTitle>
          {selectedPatient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={selectedPatient?.name?.split(" ")[0] || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={selectedPatient?.name?.split(" ")[1] || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedPatient?.email || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={selectedPatient?.phone || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                defaultValue={selectedPatient?.age || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedPatient?.status || "active"}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical Conditions"
                multiline
                rows={2}
                defaultValue={selectedPatient?.conditions?.join(", ") || ""}
                helperText="Separate multiple conditions with commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedPatient ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProviderPatients;
