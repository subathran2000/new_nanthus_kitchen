import React from "react";
import type { SxProps, Theme } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import { formInputStyle } from "./FormStyles";

/**
 * Props for the reusable FormField component
 */
interface FormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}

/**
 * Reusable FormField component to reduce duplication in forms
 * Combines TextField with standardized styling and error handling
 */
const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  value,
  onChange,
  icon,
  error,
  placeholder,
  type = "text",
  multiline = false,
  rows = 1,
  disabled = false,
  required = false,
  sx = {},
  fullWidth = true,
}) => {
  // Merge styles properly for MUI
  const mergedSx: SxProps<Theme> = {
    ...(formInputStyle as object),
    ...(sx as object),
    "& .MuiFormHelperText-root": {
      color: "#FF6B6B",
      fontSize: "0.8rem",
    },
  };

  return (
    <TextField
      fullWidth={fullWidth}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      error={!!error}
      helperText={error}
      multiline={multiline}
      rows={rows}
      slotProps={{
        input: icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : undefined,
      }}
      sx={mergedSx}
      variant="outlined"
    />
  );
};

export default FormField;
