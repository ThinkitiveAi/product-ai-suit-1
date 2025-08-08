import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  medicalHistory: Array<{
    condition: string;
    diagnosisDate: string;
    status: "active" | "resolved" | "chronic";
  }>;
  allergies: string[];
  medications: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "inactive";
}

export interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    status: string;
    gender: string;
    ageRange: string;
  };
}

const initialState: PatientState = {
  patients: [],
  currentPatient: null,
  isLoading: false,
  error: null,
  searchTerm: "",
  filters: {
    status: "",
    gender: "",
    ageRange: "",
  },
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
    phone: "+1-555-0101",
    address: {
      street: "456 Oak Ave",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA",
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456",
      groupNumber: "GRP789",
    },
    emergencyContacts: [
      {
        name: "Michael Johnson",
        relationship: "Spouse",
        phone: "+1-555-0102",
      },
    ],
    medicalHistory: [
      {
        condition: "Hypertension",
        diagnosisDate: "2020-01-15",
        status: "chronic",
      },
    ],
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril", "Metformin"],
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    status: "active",
  },
  {
    id: "2",
    firstName: "Robert",
    lastName: "Chen",
    dateOfBirth: "1978-07-22",
    gender: "male",
    email: "robert.chen@email.com",
    phone: "+1-555-0103",
    address: {
      street: "789 Pine St",
      city: "Riverside",
      state: "CA",
      zipCode: "92501",
      country: "USA",
    },
    insurance: {
      provider: "Aetna",
      policyNumber: "AET789012",
      groupNumber: "GRP456",
    },
    emergencyContacts: [
      {
        name: "Lisa Chen",
        relationship: "Spouse",
        phone: "+1-555-0104",
      },
    ],
    medicalHistory: [
      {
        condition: "Type 2 Diabetes",
        diagnosisDate: "2019-06-10",
        status: "chronic",
      },
    ],
    allergies: ["Sulfa drugs"],
    medications: ["Metformin", "Glipizide"],
    lastVisit: "2024-01-20",
    status: "active",
  },
];

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

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<PatientState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        gender: "",
        ageRange: "",
      };
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
      if (state.currentPatient?.id === action.payload.id) {
        state.currentPatient = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
      if (state.currentPatient?.id === action.payload) {
        state.currentPatient = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const {
  setSearchTerm,
  setFilters,
  clearFilters,
  addPatient,
  updatePatient,
  deletePatient,
} = patientSlice.actions;

export default patientSlice.reducer;
