import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  testCategory: string;
  dateOrdered: string;
  dateCompleted: string;
  status: "pending" | "completed" | "cancelled";
  results: Array<{
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag: "normal" | "high" | "low" | "critical";
  }>;
  providerId: string;
  providerName: string;
  labName: string;
  notes?: string;
  attachments?: string[];
  cost?: number;
  insurance?: {
    provider: string;
    coverage: number;
  };
}

export interface LabResultState {
  labResults: LabResult[];
  currentLabResult: LabResult | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    category: string;
    dateRange: {
      start: string;
      end: string;
    };
  };
}

const initialState: LabResultState = {
  labResults: [],
  currentLabResult: null,
  isLoading: false,
  error: null,
  filters: {
    status: "",
    category: "",
    dateRange: {
      start: "",
      end: "",
    },
  },
};

// Mock data
const mockLabResults: LabResult[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Sarah Johnson",
    testName: "Complete Blood Count (CBC)",
    testCategory: "Hematology",
    dateOrdered: "2024-01-15",
    dateCompleted: "2024-01-16",
    status: "completed",
    results: [
      {
        parameter: "White Blood Cells",
        value: "7.2",
        unit: "K/µL",
        referenceRange: "4.5-11.0",
        flag: "normal",
      },
      {
        parameter: "Red Blood Cells",
        value: "4.8",
        unit: "M/µL",
        referenceRange: "4.2-5.4",
        flag: "normal",
      },
      {
        parameter: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        referenceRange: "12.0-15.5",
        flag: "normal",
      },
    ],
    providerId: "1",
    providerName: "Dr. Michael Smith",
    labName: "Central Lab Services",
    cost: 85,
    insurance: {
      provider: "Blue Cross Blue Shield",
      coverage: 80,
    },
  },
];

export const fetchLabResults = createAsyncThunk(
  "labResults/fetchLabResults",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockLabResults;
    } catch (error) {
      return rejectWithValue("Failed to fetch lab results");
    }
  }
);

const labResultSlice = createSlice({
  name: "labResults",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<LabResultState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        category: "",
        dateRange: {
          start: "",
          end: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLabResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.labResults = action.payload;
      })
      .addCase(fetchLabResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } = labResultSlice.actions;

export default labResultSlice.reducer;
