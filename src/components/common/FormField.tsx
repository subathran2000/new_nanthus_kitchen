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
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : undefined
      }
      // @ts-ignore - MUI sx prop type inference issue
      sx={{
        ...formInputStyle,
        ...sx,
        "& .MuiFormHelperText-root": {
          color: "#FF6B6B",
          fontSize: "0.8rem",
        },
      }}
      variant="outlined"
    />
  );
};

export default FormField;
