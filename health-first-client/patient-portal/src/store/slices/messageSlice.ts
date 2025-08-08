import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "patient" | "provider";
  recipientId: string;
  recipientName: string;
  recipientRole: "patient" | "provider";
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  attachments?: string[];
  threadId?: string;
}

export interface MessageState {
  messages: Message[];
  currentMessage: Message | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    priority: string;
    isRead: boolean | null;
    sender: string;
  };
}

const initialState: MessageState = {
  messages: [],
  currentMessage: null,
  isLoading: false,
  error: null,
  filters: {
    priority: "",
    isRead: null,
    sender: "",
  },
};

// Mock data
const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "Dr. Michael Smith",
    senderRole: "provider",
    recipientId: "1",
    recipientName: "Sarah Johnson",
    recipientRole: "patient",
    subject: "Lab Results Available",
    content:
      "Your recent blood work results are now available in your patient portal. Please review them and let me know if you have any questions.",
    timestamp: "2024-02-10T10:30:00Z",
    isRead: false,
    priority: "medium",
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Sarah Johnson",
    senderRole: "patient",
    recipientId: "1",
    recipientName: "Dr. Michael Smith",
    recipientRole: "provider",
    subject: "Medication Refill Request",
    content:
      "I need a refill for my Lisinopril prescription. Can you please authorize this?",
    timestamp: "2024-02-09T14:15:00Z",
    isRead: true,
    priority: "low",
  },
];

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockMessages;
    } catch (error) {
      return rejectWithValue("Failed to fetch messages");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (
    messageData: Omit<Message, "id" | "timestamp">,
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newMessage: Message = {
        ...messageData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      return newMessage;
    } catch (error) {
      return rejectWithValue("Failed to send message");
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<MessageState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        priority: "",
        isRead: null,
        sender: "",
      };
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find((m) => m.id === action.payload);
      if (message) {
        message.isRead = true;
      }
      if (state.currentMessage?.id === action.payload) {
        state.currentMessage.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.messages.forEach((message) => {
        message.isRead = true;
      });
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
      if (state.currentMessage?.id === action.payload) {
        state.currentMessage = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.unshift(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  markAsRead,
  markAllAsRead,
  deleteMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
