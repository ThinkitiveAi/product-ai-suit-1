import {
  AccessTime,
  Add,
  CalendarToday,
  Close,
  Delete,
  Edit,
  Save,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format, setHours, setMinutes } from "date-fns";
import React, { useState } from "react";

interface AvailabilitySlot {
  id: string;
  day: string;
  from: Date;
  to: Date;
}

interface BlockDay {
  id: string;
  fromDate: Date;
  toDate: Date;
  fromTime: Date;
  toTime: Date;
}

interface DayWiseAvailabilityProps {
  onClose?: () => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DayWiseAvailability: React.FC<DayWiseAvailabilityProps> = ({
  onClose,
}) => {
  const [selectedProvider, setSelectedProvider] = useState("John Doe");
  const [timeZone, setTimeZone] = useState("UTC-5 (Eastern Time)");
  const [availabilitySlots, setAvailabilitySlots] = useState<
    AvailabilitySlot[]
  >(
    DAYS.map((day, index) => ({
      id: `slot-${index}`,
      day,
      from: setMinutes(setHours(new Date(), 9), 0), // 9:00 AM
      to: setMinutes(setHours(new Date(), 18), 0), // 6:00 PM
    }))
  );
  const [blockDays, setBlockDays] = useState<BlockDay[]>([]);
  const [isBlockDayDialogOpen, setIsBlockDayDialogOpen] = useState(false);
  const [newBlockDay, setNewBlockDay] = useState<Partial<BlockDay>>({
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: setMinutes(setHours(new Date(), 9), 0),
    toTime: setMinutes(setHours(new Date(), 17), 0),
  });

  const handleAvailabilityChange = (
    slotId: string,
    field: "from" | "to",
    value: Date
  ) => {
    setAvailabilitySlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    );
  };

  const handleDeleteSlot = (slotId: string) => {
    setAvailabilitySlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const handleAddBlockDay = () => {
    if (
      newBlockDay.fromDate &&
      newBlockDay.toDate &&
      newBlockDay.fromTime &&
      newBlockDay.toTime
    ) {
      const blockDay: BlockDay = {
        id: `block-${Date.now()}`,
        fromDate: newBlockDay.fromDate,
        toDate: newBlockDay.toDate,
        fromTime: newBlockDay.fromTime,
        toTime: newBlockDay.toTime,
      };
      setBlockDays((prev) => [...prev, blockDay]);
      setNewBlockDay({
        fromDate: new Date(),
        toDate: new Date(),
        fromTime: setMinutes(setHours(new Date(), 9), 0),
        toTime: setMinutes(setHours(new Date(), 17), 0),
      });
      setIsBlockDayDialogOpen(false);
    }
  };

  const handleDeleteBlockDay = (blockId: string) => {
    setBlockDays((prev) => prev.filter((block) => block.id !== blockId));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log("Saving availability configuration:", {
      provider: selectedProvider,
      timeZone,
      availabilitySlots,
      blockDays,
    });
    // You can add a success notification here
  };

  const handleClose = () => {
    // Handle closing the modal/dialog
    console.log("Closing availability configuration");
    if (onClose) {
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, bgcolor: "background.default" }} width="100%">
        <CardContent>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}>
            <Typography variant="h4" fontWeight="600">
              Day Wise Availability
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Slot Creation Setting
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Day Wise Availability Section */}
            <Grid xs={12} md={8}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Day Wise Availability
              </Typography>

              {/* Provider Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Provider</InputLabel>
                <Select
                  value={selectedProvider}
                  label="Provider"
                  onChange={(e) => setSelectedProvider(e.target.value)}>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                  <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
                </Select>
              </FormControl>

              {/* Weekly Schedule Table */}
              <TableContainer
                component={Paper}
                sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "grey.50" }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }}>
                        Day
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }}>
                        From
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }}>
                        To
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availabilitySlots.map((slot, index) => (
                      <TableRow
                        key={slot.id}
                        hover
                        sx={{
                          "&:nth-of-type(odd)": { bgcolor: "grey.25" },
                          "&:hover": { bgcolor: "primary.50" },
                        }}>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight="500"
                            color="text.primary">
                            {slot.day}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TimePicker
                            value={slot.from}
                            onChange={(newValue) =>
                              newValue &&
                              handleAvailabilityChange(
                                slot.id,
                                "from",
                                newValue
                              )
                            }
                            slotProps={{
                              textField: {
                                size: "small",
                                InputProps: {
                                  startAdornment: (
                                    <AccessTime
                                      sx={{
                                        fontSize: 16,
                                        mr: 1,
                                        color: "text.secondary",
                                      }}
                                    />
                                  ),
                                },
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TimePicker
                            value={slot.to}
                            onChange={(newValue) =>
                              newValue &&
                              handleAvailabilityChange(slot.id, "to", newValue)
                            }
                            slotProps={{
                              textField: {
                                size: "small",
                                InputProps: {
                                  startAdornment: (
                                    <AccessTime
                                      sx={{
                                        fontSize: 16,
                                        mr: 1,
                                        color: "text.secondary",
                                      }}
                                    />
                                  ),
                                },
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteSlot(slot.id)}
                            sx={{
                              mr: 1,
                              "&:hover": {
                                bgcolor: "error.50",
                              },
                            }}>
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            sx={{
                              "&:hover": {
                                bgcolor: "primary.50",
                              },
                            }}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Slot Creation Setting Section */}
            <Grid xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Slot Creation Setting
              </Typography>

              {/* Time Zone Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={timeZone}
                  label="Time Zone"
                  onChange={(e) => setTimeZone(e.target.value)}>
                  <MenuItem value="UTC-5 (Eastern Time)">
                    UTC-5 (Eastern Time)
                  </MenuItem>
                  <MenuItem value="UTC-6 (Central Time)">
                    UTC-6 (Central Time)
                  </MenuItem>
                  <MenuItem value="UTC-7 (Mountain Time)">
                    UTC-7 (Mountain Time)
                  </MenuItem>
                  <MenuItem value="UTC-8 (Pacific Time)">
                    UTC-8 (Pacific Time)
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Block Days Section */}
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  Block Days
                </Typography>

                <Stack spacing={2} sx={{ mb: 2 }}>
                  <DatePicker
                    label="From Date"
                    value={newBlockDay.fromDate || null}
                    onChange={(newValue) =>
                      setNewBlockDay((prev) => ({
                        ...prev,
                        fromDate: newValue || new Date(),
                      }))
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <CalendarToday
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                          ),
                        },
                      },
                    }}
                  />

                  <DatePicker
                    label="To Date"
                    value={newBlockDay.toDate || null}
                    onChange={(newValue) =>
                      setNewBlockDay((prev) => ({
                        ...prev,
                        toDate: newValue || new Date(),
                      }))
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <CalendarToday
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                          ),
                        },
                      },
                    }}
                  />

                  <TimePicker
                    label="From Time"
                    value={newBlockDay.fromTime || null}
                    onChange={(newValue) =>
                      setNewBlockDay((prev) => ({
                        ...prev,
                        fromTime: newValue || new Date(),
                      }))
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <AccessTime
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                          ),
                        },
                      },
                    }}
                  />

                  <TimePicker
                    label="To Time"
                    value={newBlockDay.toTime || null}
                    onChange={(newValue) =>
                      setNewBlockDay((prev) => ({
                        ...prev,
                        toTime: newValue || new Date(),
                      }))
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <AccessTime
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                          ),
                        },
                      },
                    }}
                  />
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  onClick={handleAddBlockDay}
                  sx={{ mb: 2 }}>
                  Add Block Days
                </Button>

                {/* Block Days List */}
                {blockDays.length > 0 && (
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom>
                      Blocked Periods:
                    </Typography>
                    <Stack spacing={1}>
                      {blockDays.map((block) => (
                        <Chip
                          key={block.id}
                          label={`${format(
                            block.fromDate,
                            "MMM dd"
                          )} - ${format(block.toDate, "MMM dd")} | ${format(
                            block.fromTime,
                            "HH:mm"
                          )} - ${format(block.toTime, "HH:mm")}`}
                          onDelete={() => handleDeleteBlockDay(block.id)}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Bottom Action Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
              pt: 3,
              borderTop: 1,
              borderColor: "divider",
            }}>
            <Button
              variant="outlined"
              startIcon={<Close />}
              onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{ bgcolor: "primary.main" }}>
              Save
            </Button>
          </Box>
        </CardContent>
      </Box>
    </LocalizationProvider>
  );
};

export default DayWiseAvailability;
