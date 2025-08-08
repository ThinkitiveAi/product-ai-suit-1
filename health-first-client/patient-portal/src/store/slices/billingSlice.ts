import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balance: number;
  status: "pending" | "partial" | "paid" | "overdue" | "cancelled";
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  insurance?: {
    provider: string;
    policyNumber: string;
    coverage: number;
    deductible: number;
  };
  paymentHistory: Array<{
    date: string;
    amount: number;
    method: string;
    reference: string;
  }>;
  notes?: string;
}

export interface BillingState {
  billingRecords: BillingRecord[];
  currentBillingRecord: BillingRecord | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    dateRange: {
      start: string;
      end: string;
    };
    amountRange: {
      min: number;
      max: number;
    };
  };
}

const initialState: BillingState = {
  billingRecords: [],
  currentBillingRecord: null,
  isLoading: false,
  error: null,
  filters: {
    status: "",
    dateRange: {
      start: "",
      end: "",
    },
    amountRange: {
      min: 0,
      max: 0,
    },
  },
};

// Mock data
const mockBillingRecords: BillingRecord[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Sarah Johnson",
    invoiceNumber: "INV-2024-001",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 250,
    paidAmount: 0,
    balance: 250,
    status: "pending",
    items: [
      {
        description: "Office Visit - Annual Physical",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
      {
        description: "Lab Work - Blood Tests",
        quantity: 1,
        unitPrice: 100,
        total: 100,
      },
    ],
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456",
      coverage: 80,
      deductible: 500,
    },
    paymentHistory: [],
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Robert Chen",
    invoiceNumber: "INV-2024-002",
    date: "2024-01-20",
    dueDate: "2024-02-20",
    amount: 200,
    paidAmount: 200,
    balance: 0,
    status: "paid",
    items: [
      {
        description: "Follow-up Consultation",
        quantity: 1,
        unitPrice: 200,
        total: 200,
      },
    ],
    insurance: {
      provider: "Aetna",
      policyNumber: "AET789012",
      coverage: 90,
      deductible: 250,
    },
    paymentHistory: [
      {
        date: "2024-01-25",
        amount: 200,
        method: "Credit Card",
        reference: "CC-123456",
      },
    ],
  },
];

export const fetchBillingRecords = createAsyncThunk(
  "billing/fetchBillingRecords",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockBillingRecords;
    } catch (error) {
      return rejectWithValue("Failed to fetch billing records");
    }
  }
);

export const processPayment = createAsyncThunk(
  "billing/processPayment",
  async (
    paymentData: {
      billingRecordId: string;
      amount: number;
      method: string;
      reference: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return paymentData;
    } catch (error) {
      return rejectWithValue("Failed to process payment");
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<BillingState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        dateRange: {
          start: "",
          end: "",
        },
        amountRange: {
          min: 0,
          max: 0,
        },
      };
    },
    addPayment: (
      state,
      action: PayloadAction<{
        billingRecordId: string;
        payment: {
          date: string;
          amount: number;
          method: string;
          reference: string;
        };
      }>
    ) => {
      const billingRecord = state.billingRecords.find(
        (b) => b.id === action.payload.billingRecordId
      );
      if (billingRecord) {
        billingRecord.paymentHistory.push(action.payload.payment);
        billingRecord.paidAmount += action.payload.payment.amount;
        billingRecord.balance = billingRecord.amount - billingRecord.paidAmount;

        if (billingRecord.balance <= 0) {
          billingRecord.status = "paid";
        } else if (billingRecord.paidAmount > 0) {
          billingRecord.status = "partial";
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBillingRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.billingRecords = action.payload;
      })
      .addCase(fetchBillingRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(processPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.isLoading = false;
        // Payment processing logic would be handled in the reducer
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, addPayment } = billingSlice.actions;

export default billingSlice.reducer;
