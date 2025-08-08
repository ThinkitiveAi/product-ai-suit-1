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

// Authentication Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Patient Portal Pages
import PatientDashboard from "./pages/patient/Dashboard";
import PatientAppointments from "./pages/patient/Appointments";
import PatientMedicalRecords from "./pages/patient/MedicalRecords";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import PatientLabResults from "./pages/patient/LabResults";
import PatientBilling from "./pages/patient/Billing";
import PatientMessages from "./pages/patient/Messages";
import PatientProfile from "./pages/patient/Profile";

// Provider Portal Pages
import ProviderDashboard from "./pages/provider/Dashboard";
import ProviderPatients from "./pages/provider/Patients";
import ProviderAppointments from "./pages/provider/Appointments";
import ProviderSchedule from "./pages/provider/Schedule";
import ProviderPrescriptions from "./pages/provider/Prescriptions";
import ProviderLabOrders from "./pages/provider/LabOrders";
import ProviderBilling from "./pages/provider/Billing";
import ProviderMessages from "./pages/provider/Messages";
import ProviderSettings from "./pages/provider/Settings";

// Context
import { AuthProvider } from "./contexts/AuthContext";

// Theme configuration
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
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
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
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
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

              {/* Patient Portal Routes */}
              <Route
                path="/patient-portal"
                element={<DashboardLayout userType="patient" />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route
                  path="medical-records"
                  element={<PatientMedicalRecords />}
                />
                <Route
                  path="prescriptions"
                  element={<PatientPrescriptions />}
                />
                <Route path="lab-results" element={<PatientLabResults />} />
                <Route path="billing" element={<PatientBilling />} />
                <Route path="messages" element={<PatientMessages />} />
                <Route path="profile" element={<PatientProfile />} />
              </Route>

              {/* Provider Portal Routes */}
              <Route
                path="/provider-portal"
                element={<DashboardLayout userType="provider" />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<ProviderDashboard />} />
                <Route path="patients" element={<ProviderPatients />} />
                <Route path="appointments" element={<ProviderAppointments />} />
                <Route path="schedule" element={<ProviderSchedule />} />
                <Route
                  path="prescriptions"
                  element={<ProviderPrescriptions />}
                />
                <Route path="lab-orders" element={<ProviderLabOrders />} />
                <Route path="billing" element={<ProviderBilling />} />
                <Route path="messages" element={<ProviderMessages />} />
                <Route path="settings" element={<ProviderSettings />} />
              </Route>

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
