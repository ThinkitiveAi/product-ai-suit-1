import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Layout Components
import DashboardLayout from "./components/layout/DashboardLayout";
import AuthLayout from "./components/layout/AuthLayout";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProviderSignIn from "./components/auth/ProviderSignIn";

// Patient Portal Components
import PatientDashboard from "./components/patient/Dashboard";
import PatientAppointments from "./components/patient/Appointments";
import PatientMedicalRecords from "./components/patient/MedicalRecords";
import PatientPrescriptions from "./components/patient/Prescriptions";
import PatientLabResults from "./components/patient/LabResults";
import PatientBilling from "./components/patient/Billing";
import PatientMessages from "./components/patient/Messages";
import PatientProfile from "./components/patient/Profile";

// Provider Portal Components
import ProviderDashboard from "./components/provider/Dashboard";
import ProviderPatients from "./components/provider/Patients";
import ProviderAppointments from "./components/provider/Appointments";
import ProviderSchedule from "./components/provider/Schedule";
import ProviderPrescriptions from "./components/provider/Prescriptions";
import ProviderLabOrders from "./components/provider/LabOrders";
import ProviderBilling from "./components/provider/Billing";
import ProviderMessages from "./components/provider/Messages";
import ProviderSettings from "./components/provider/Settings";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Healthcare blue
    },
    secondary: {
      main: "#4caf50", // Medical green
    },
    error: {
      main: "#f44336", // Medical red
    },
    warning: {
      main: "#ff9800", // Amber
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <Register />
                </AuthLayout>
              }
            />
            <Route
              path="/provider-signin"
              element={<ProviderSignIn />}
            />

            {/* Patient Portal Routes */}
            <Route
              path="/patient-portal"
              element={
                <ProtectedRoute role="patient">
                  <DashboardLayout role="patient" />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route
                path="medical-records"
                element={<PatientMedicalRecords />}
              />
              <Route path="prescriptions" element={<PatientPrescriptions />} />
              <Route path="lab-results" element={<PatientLabResults />} />
              <Route path="billing" element={<PatientBilling />} />
              <Route path="messages" element={<PatientMessages />} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>

            {/* Provider Portal Routes */}
            <Route
              path="/provider-portal"
              element={
                <ProtectedRoute role="provider">
                  <DashboardLayout role="provider" />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ProviderDashboard />} />
              <Route path="patients" element={<ProviderPatients />} />
              <Route path="appointments" element={<ProviderAppointments />} />
              <Route path="schedule" element={<ProviderSchedule />} />
              <Route path="prescriptions" element={<ProviderPrescriptions />} />
              <Route path="lab-orders" element={<ProviderLabOrders />} />
              <Route path="billing" element={<ProviderBilling />} />
              <Route path="messages" element={<ProviderMessages />} />
              <Route path="settings" element={<ProviderSettings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
