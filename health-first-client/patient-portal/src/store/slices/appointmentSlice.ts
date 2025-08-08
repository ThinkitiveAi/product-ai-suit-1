import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "checkup" | "consultation" | "follow-up" | "emergency" | "procedure";
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  reason: string;
  notes?: string;
  location: string;
  room?: string;
  insurance?: {
    provider: string;
    policyNumber: string;
  };
  cost?: number;
  paymentStatus?: "pending" | "paid" | "partial";
}

export interface AppointmentState {
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    type: string;
    dateRange: {
      start: string;
      end: string;
    };
    provider: string;
  };
}

const initialState: AppointmentState = {
  appointments: [],
  currentAppointment: null,
  isLoading: false,
  error: null,
  filters: {
    status: "",
    type: "",
    dateRange: {
      start: "",
      end: "",
    },
    provider: "",
  },
};

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Sarah Johnson",
    providerId: "1",
    providerName: "Dr. Michael Smith",
    date: "2024-02-15",
    time: "09:00",
    duration: 30,
    type: "checkup",
    status: "scheduled",
    reason: "Annual physical examination",
    location: "Main Clinic - Room 101",
    room: "101",
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456",
    },
    cost: 150,
    paymentStatus: "pending",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Robert Chen",
    providerId: "1",
    providerName: "Dr. Michael Smith",
    date: "2024-02-15",
    time: "10:00",
    duration: 45,
    type: "follow-up",
    status: "confirmed",
    reason: "Diabetes management follow-up",
    notes: "Patient reports improved blood sugar levels",
    location: "Main Clinic - Room 102",
    room: "102",
    insurance: {
      provider: "Aetna",
      policyNumber: "AET789012",
    },
    cost: 200,
    paymentStatus: "paid",
  },
  {
    id: "3",
    patientId: "1",
    patientName: "Sarah Johnson",
    providerId: "2",
    providerName: "Dr. Emily Davis",
    date: "2024-02-20",
    time: "14:30",
    duration: 60,
    type: "consultation",
    status: "scheduled",
    reason: "Cardiology consultation",
    location: "Cardiology Department",
    room: "Cardio-1",
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456",
    },
    cost: 300,
    paymentStatus: "pending",
  },
];

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockAppointments;
    } catch (error) {
      return rejectWithValue("Failed to fetch appointments");
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (appointmentId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const appointment = mockAppointments.find((a) => a.id === appointmentId);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      return appointment;
    } catch (error) {
      return rejectWithValue("Failed to fetch appointment");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData: Omit<Appointment, "id">, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
      };
      return newAppointment;
    } catch (error) {
      return rejectWithValue("Failed to create appointment");
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async (appointmentData: Appointment, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return appointmentData;
    } catch (error) {
      return rejectWithValue("Failed to update appointment");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<AppointmentState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        type: "",
        dateRange: {
          start: "",
          end: "",
        },
        provider: "",
      };
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(
        (a) => a.id === action.payload
      );
      if (appointment) {
        appointment.status = "cancelled";
      }
      if (state.currentAppointment?.id === action.payload) {
        state.currentAppointment.status = "cancelled";
      }
    },
    confirmAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(
        (a) => a.id === action.payload
      );
      if (appointment) {
        appointment.status = "confirmed";
      }
      if (state.currentAppointment?.id === action.payload) {
        state.currentAppointment.status = "confirmed";
      }
    },
    completeAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(
        (a) => a.id === action.payload
      );
      if (appointment) {
        appointment.status = "completed";
      }
      if (state.currentAppointment?.id === action.payload) {
        state.currentAppointment.status = "completed";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAppointmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAppointment = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.appointments.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        if (state.currentAppointment?.id === action.payload.id) {
          state.currentAppointment = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  cancelAppointment,
  confirmAppointment,
  completeAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
