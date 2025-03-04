import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  error?: boolean;
  helperText?: string;
  type?: string;
  rows?: number;
  multiline?: boolean;
};

const Input: FC<TInputProps> = ({
  name,
  control,
  label,
  error,
  helperText,
  type,
  rows,
  multiline,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <TextField
          {...field}
          type={type}
          multiline={multiline}
          rows={rows}
          value={field.value ?? ""} // Ensure it's always controlled
          label={label}
          error={error || !!fieldError}
          helperText={helperText || (fieldError ? fieldError.message : "")}
          variant="outlined"
          fullWidth
          {...rest}
        />
      )}
    />
  );
};

export default React.memo(Input);
