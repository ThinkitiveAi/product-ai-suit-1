import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  medication: string;
  dosage: string;
  frequency: string;
  quantity: number;
  refills: number;
  datePrescribed: string;
  dateFilled?: string;
  nextRefillDate?: string;
  status: "active" | "discontinued" | "completed";
  instructions: string;
  sideEffects?: string[];
  cost?: number;
  insurance?: {
    provider: string;
    coverage: number;
  };
}

export interface PrescriptionState {
  prescriptions: Prescription[];
  currentPrescription: Prescription | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    provider: string;
    dateRange: {
      start: string;
      end: string;
    };
  };
}

const initialState: PrescriptionState = {
  prescriptions: [],
  currentPrescription: null,
  isLoading: false,
  error: null,
  filters: {
    status: "",
    provider: "",
    dateRange: {
      start: "",
      end: "",
    },
  },
};

// Mock data
const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Sarah Johnson",
    providerId: "1",
    providerName: "Dr. Michael Smith",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    quantity: 30,
    refills: 3,
    datePrescribed: "2024-01-15",
    dateFilled: "2024-01-15",
    nextRefillDate: "2024-02-15",
    status: "active",
    instructions: "Take one tablet daily in the morning",
    sideEffects: ["Dizziness", "Dry cough"],
    cost: 25,
    insurance: {
      provider: "Blue Cross Blue Shield",
      coverage: 80,
    },
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Robert Chen",
    providerId: "1",
    providerName: "Dr. Michael Smith",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    quantity: 60,
    refills: 2,
    datePrescribed: "2024-01-20",
    dateFilled: "2024-01-20",
    nextRefillDate: "2024-02-20",
    status: "active",
    instructions: "Take one tablet with breakfast and dinner",
    sideEffects: ["Nausea", "Diarrhea"],
    cost: 15,
    insurance: {
      provider: "Aetna",
      coverage: 90,
    },
  },
];

export const fetchPrescriptions = createAsyncThunk(
  "prescriptions/fetchPrescriptions",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockPrescriptions;
    } catch (error) {
      return rejectWithValue("Failed to fetch prescriptions");
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<PrescriptionState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        provider: "",
        dateRange: {
          start: "",
          end: "",
        },
      };
    },
    addPrescription: (state, action: PayloadAction<Prescription>) => {
      state.prescriptions.push(action.payload);
    },
    updatePrescription: (state, action: PayloadAction<Prescription>) => {
      const index = state.prescriptions.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.prescriptions[index] = action.payload;
      }
    },
    requestRefill: (state, action: PayloadAction<string>) => {
      const prescription = state.prescriptions.find(
        (p) => p.id === action.payload
      );
      if (prescription && prescription.refills > 0) {
        prescription.refills -= 1;
        prescription.nextRefillDate = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrescriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prescriptions = action.payload;
      })
      .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  addPrescription,
  updatePrescription,
  requestRefill,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
