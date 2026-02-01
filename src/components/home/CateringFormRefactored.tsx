import React, { useState, useCallback, memo } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";

import FormField from "../common/FormField";
import {
  formContainerStyle,
  formLeftColumnStyle,
  formRightColumnStyle,
  formTitleStyle,
  formDescriptionStyle,
  formButtonStyle,
  successMessageStyle,
} from "../common/FormStyles";
import {
  FormStatus as FormStatusConst,
  type FormStatusType,
} from "../../types";
import type { CateringFormData } from "../../types";
import { validateCateringForm } from "../../utils/validation";

// Import background image
import cateringImage from "../../assets/images/bg2.jpg";

interface CateringFormProps {
  onSubmitCallback?: (data: CateringFormData) => void | Promise<void>;
}

const CateringForm = memo(({ onSubmitCallback }: CateringFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState<CateringFormData>({
    name: "",
    email: "",
    eventType: "",
    date: "",
    guests: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatusType>(FormStatusConst.IDLE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      const validation = validateCateringForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      setStatus(FormStatusConst.LOADING);
      setErrors({});

      try {
        // Call optional callback if provided
        if (onSubmitCallback) {
          await onSubmitCallback(formData);
        } else {
          // TODO: Implement API call to backend
          // await fetch('/api/catering', { method: 'POST', body: JSON.stringify(formData) });
        }

        setStatus(FormStatusConst.SUCCESS);
        setFormData({
          name: "",
          email: "",
          eventType: "",
          date: "",
          guests: "",
          message: "",
        });

        // Reset status after 5 seconds
        setTimeout(() => setStatus(FormStatusConst.IDLE), 5000);
      } catch (error) {
        setStatus(FormStatusConst.ERROR);
        setErrors({ submit: "Failed to submit form. Please try again." });
      }
    },
    [formData, onSubmitCallback],
  );

  return (
    <Box sx={formContainerStyle}>
      {/* Left Column: Visual/Branding */}
      {!isMobile && (
        <Box sx={formLeftColumnStyle}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${cateringImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 300,
                mb: 2,
                background: "linear-gradient(135deg, #FF8C00, #FFB84D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Special Events
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.7,
              }}
            >
              Let us cater your next special event. Fill out the form to get a
              custom quote for your celebration.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Right Column: Form */}
      <Box sx={formRightColumnStyle}>
        <Typography sx={formTitleStyle}>Catering Inquiry</Typography>
        <Typography sx={formDescriptionStyle}>
          Tell us about your event and we'll create the perfect menu for you.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <FormField
              name="name"
              label="Your Name"
              value={formData.name}
              onChange={handleChange}
              icon={<PersonIcon />}
              error={errors.name}
              placeholder="John Smith"
              required
            />

            <FormField
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              icon={<EmailIcon />}
              error={errors.email}
              type="email"
              placeholder="your@email.com"
              required
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <FormField
                  name="eventType"
                  label="Event Type"
                  value={formData.eventType}
                  onChange={handleChange}
                  icon={<EventIcon />}
                  error={errors.eventType}
                  required
                  sx={{
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <FormField
                  name="date"
                  label="Event Date"
                  value={formData.date}
                  onChange={handleChange}
                  icon={<CalendarTodayIcon />}
                  error={errors.date}
                  type="date"
                  required
                />
              </Box>
            </Box>

            <FormField
              name="guests"
              label="Number of Guests"
              value={formData.guests}
              onChange={handleChange}
              icon={<GroupsIcon />}
              error={errors.guests}
              type="number"
              placeholder="e.g., 50"
              required
            />

            <FormField
              name="message"
              label="Event Details & Preferences"
              value={formData.message}
              onChange={handleChange}
              icon={<NoteIcon />}
              error={errors.message}
              placeholder="Tell us about your event, dietary requirements, theme, etc."
              multiline
              rows={4}
              required
            />

            {errors.submit && (
              <Box
                sx={{
                  ...successMessageStyle,
                  background: "rgba(211, 47, 47, 0.2)",
                  border: "1px solid rgba(211, 47, 47, 0.5)",
                  color: "#F44336",
                }}
              >
                <Typography>{errors.submit}</Typography>
              </Box>
            )}

            <AnimatePresence>
              {status === FormStatusConst.SUCCESS && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Box sx={successMessageStyle}>
                    <Typography>
                      ✓ Thank you! We've received your catering inquiry. We'll
                      contact you soon.
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="outlined"
              disabled={status === FormStatusConst.LOADING}
              sx={{
                ...formButtonStyle,
                mt: 2,
              }}
            >
              {status === FormStatusConst.LOADING
                ? "Submitting..."
                : "Request Catering"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
});

CateringForm.displayName = "CateringForm";

export default CateringForm;
