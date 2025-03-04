import { Typography } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
