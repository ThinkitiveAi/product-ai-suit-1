import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "patient" | "provider";
  avatar?: string;
  specialty?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  notifications: any[];
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
  notifications: [],
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      username?: string;
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      role?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response - in real app, this would be an API call
      const mockUser: User = {
        id: "1",
        email: credentials.email,
        firstName:
          credentials.firstName ||
          (credentials.email.includes("provider") ? "Dr. John" : "John"),
        lastName: credentials.lastName || "Doe",
        role:
          credentials.role ||
          (credentials.email.includes("provider") ? "provider" : "patient"),
        avatar: "https://via.placeholder.com/150",
        specialty: credentials.email.includes("provider")
          ? "Cardiology"
          : undefined,
        licenseNumber: credentials.email.includes("provider")
          ? "MD123456"
          : undefined,
        dateOfBirth: "1980-01-01",
        phoneNumber: "+1-555-0123",
        address: {
          street: "123 Medical Center Dr",
          city: "Healthcare City",
          state: "CA",
          zipCode: "90210",
        },
      };

      const token = "mock-jwt-token-" + Date.now();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { user: mockUser, token };
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: "patient" | "provider";
      specialty?: string;
      licenseNumber?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        specialty: userData.specialty,
        licenseNumber: userData.licenseNumber,
        avatar: "https://via.placeholder.com/150",
        dateOfBirth: "1980-01-01",
        phoneNumber: "+1-555-0123",
        address: {
          street: "123 Medical Center Dr",
          city: "Healthcare City",
          state: "CA",
          zipCode: "90210",
        },
      };

      const token = "mock-jwt-token-" + Date.now();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { user: mockUser, token };
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
