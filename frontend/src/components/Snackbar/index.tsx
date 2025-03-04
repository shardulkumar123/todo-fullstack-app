"use client";
import React, { FC, useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";

type SnackbarProps = {
  message: string | null;
  onClose?: () => void;
};

const SnackbarComponent: FC<SnackbarProps> = ({ message, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
    onClose?.();
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={3000} // Auto-close after 3s
        key={message || "snackbar"} // Ensure re-render when message updates
      />
    </Box>
  );
};

export default React.memo(SnackbarComponent);
