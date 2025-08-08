import React from "react";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import DayWiseAvailability from "./DayWiseAvailability";

interface DayWiseAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
}

const DayWiseAvailabilityModal: React.FC<DayWiseAvailabilityModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          minHeight: "80vh",
        },
      }}>
      <DialogContent sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}>
          <Close />
        </IconButton>
        <DayWiseAvailability onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default DayWiseAvailabilityModal;
