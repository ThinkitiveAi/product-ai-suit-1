import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "inactive";
  avatar?: string;
}

interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  currentPatient: null,
  isLoading: false,
  error: null,
};

// Mock data
const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1985-03-15",
    gender: "female",
    email: "sarah.johnson@email.com",
    phoneNumber: "+1-555-0101",
    address: {
      street: "456 Oak Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phoneNumber: "+1-555-0102",
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456",
      groupNumber: "GRP789",
    },
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Metformin", "Lisinopril"],
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-20",
    status: "active",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    firstName: "Robert",
    lastName: "Chen",
    dateOfBirth: "1978-07-22",
    gender: "male",
    email: "robert.chen@email.com",
    phoneNumber: "+1-555-0103",
    address: {
      street: "789 Pine Avenue",
      city: "Riverside",
      state: "CA",
      zipCode: "92501",
    },
    emergencyContact: {
      name: "Lisa Chen",
      relationship: "Wife",
      phoneNumber: "+1-555-0104",
    },
    insurance: {
      provider: "Aetna",
      policyNumber: "AET789012",
      groupNumber: "GRP456",
    },
    medicalHistory: ["Asthma", "Seasonal Allergies"],
    allergies: ["Dust", "Pollen"],
    medications: ["Albuterol", "Fluticasone"],
    lastVisit: "2024-01-10",
    status: "active",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    firstName: "Maria",
    lastName: "Garcia",
    dateOfBirth: "1992-11-08",
    gender: "female",
    email: "maria.garcia@email.com",
    phoneNumber: "+1-555-0105",
    address: {
      street: "321 Elm Court",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
    },
    emergencyContact: {
      name: "Carlos Garcia",
      relationship: "Brother",
      phoneNumber: "+1-555-0106",
    },
    insurance: {
      provider: "UnitedHealth",
      policyNumber: "UHC345678",
      groupNumber: "GRP123",
    },
    medicalHistory: ["Migraines"],
    allergies: ["Sulfa drugs"],
    medications: ["Sumatriptan"],
    lastVisit: "2024-01-20",
    nextAppointment: "2024-03-01",
    status: "active",
    avatar: "https://via.placeholder.com/150",
  },
];

// Async thunks
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockPatients;
    } catch (error) {
      return rejectWithValue("Failed to fetch patients");
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  "patients/fetchPatientById",
  async (patientId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const patient = mockPatients.find((p) => p.id === patientId);
      if (!patient) {
        throw new Error("Patient not found");
      }
      return patient;
    } catch (error) {
      return rejectWithValue("Failed to fetch patient");
    }
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patientData: Omit<Patient, "id">, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newPatient: Patient = {
        ...patientData,
        id: Date.now().toString(),
        avatar: "https://via.placeholder.com/150",
      };
      return newPatient;
    } catch (error) {
      return rejectWithValue("Failed to add patient");
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (patientData: Patient, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return patientData;
    } catch (error) {
      return rejectWithValue("Failed to update patient");
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<Patient | null>) => {
      state.currentPatient = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patients
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch patient by ID
      .addCase(fetchPatientById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPatient = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add patient
      .addCase(addPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients.push(action.payload);
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.patients.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
        if (state.currentPatient?.id === action.payload.id) {
          state.currentPatient = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPatient, clearError } = patientSlice.actions;
export default patientSlice.reducer;
