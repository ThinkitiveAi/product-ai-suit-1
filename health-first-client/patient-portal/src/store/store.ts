import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientReducer from "./slices/patientSlice";
import appointmentReducer from "./slices/appointmentSlice";
import prescriptionReducer from "./slices/prescriptionSlice";
import labResultReducer from "./slices/labResultSlice";
import messageReducer from "./slices/messageSlice";
import billingReducer from "./slices/billingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    prescriptions: prescriptionReducer,
    labResults: labResultReducer,
    messages: messageReducer,
    billing: billingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
